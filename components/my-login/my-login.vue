<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<!-- open-type 获取用户信息，可以从@getuserinfo回调中获取到用户信息 -->
			<button style="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn">一键登录</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		computed:{
			...mapState('m_usr',['redierct']),
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_usr',['updataUserinfo','updatatoken','updatapages']),
			// 用户授权后，获取用户信息
			getUserInfo(e){
				if(e.detail.errMsg =='getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权')
				
				this.updataUserinfo(e.detail.userInfo)
				this.gettoken(e.detail)
			},
			async gettoken(info){
				uni.login({
				provider: 'weixin', //使用微信登录
				success: async function (e) {
					if (e.errMsg == "login:ok") {
					const query = {
						encryptedData:info.encryptedData,
						rawData: info.rawData,
						iv: info.iv,
						signature: info.signature,
						code: e.code
					}
					console.log(query)
					const {data: login} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
					console.log(login)
					if(login.meta.status!==200) return uni.$showMsg('登录失败!')
					// 直接把token保存到本地中
					this.updatatoken(login.message.token)
				}
			}
		})	
			},
			navigateback(){
				if(this.redierct && this.redierct.openType =='switchTab'){
					uni.switchTab({
						url: this.redierct.from,
						complete:()=>{
							this.updatapages(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height:750rpx;
	display: flex;
	background-color:#F8F8F8 ;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	.btn{
		width: 90%;
		border-radius: 20px;
		background-color: paleturquoise;
		color: plum;
		font-size: 20px;
		font-style: italic;
	}
}
</style>