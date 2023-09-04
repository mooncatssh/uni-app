<template>
	<view>
		<!-- 收货地址权限 -->
		<view class="address-box"  v-if="JSON.stringify(address)=== '{}'">
			<button type="primary" size="mini" class="address-box-btn" @click="addAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染盒子列表 -->
		<view class="address-box2" v-else @click="addAddress">
			<view class="address-col1">
				<view class="address-col1-left">
					<view>收货人:{{address.userName}}</view>
				</view>
				<view class="address-col1-right">
					
					<view>电话:{{address.telNumber}}<uni-icons type="forward"></uni-icons>
					 </view>
					
				</view>
			</view>
			<view class="address-col2">
				<view>收货地址:{{addStr}}</view>
			</view>
		</view>
		
		<!-- 盒子底部 -->
		<view class="address-box-bottom"></view>
	</view>
</template>

<script>
	import {mapMutations ,mapState,mapGetters} from 'vuex' 
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_usr',['address']),
			...mapGetters('m_usr',['addStr']),
		},
		methods:{
			...mapMutations('m_usr',['updataAddress']),
			// 增加地址
			addAddress(){
				uni.chooseAddress({
					//获取成功
					success:(res)=>{
						console.log(res)
						this.updataAddress(res)
					},
					// 获取失败
					fail:(res)=>{
					this.reAuto()
					}
				})
			},
			 async reAuto(){
				 const [err2,confirmResult] = await uni.$showModal({
					content:'检测到您没开地址授权，是否打开？',
					 cancelText:'取消',
					 confirmText:'确认'
				 })
				 if(err2) return
				 if(confirmResult.cancelText) return un.$showMsg('取消了地址授权')
				 if(confirmResult.cancelText) return uni.openSetting({
					 success:(settingResult)=> {
					 	if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功')
						if(!settingResult.authSetting['scope.address']) return uni.$showMsg('取消授权')
					 }
				 })
			 }
		}
	}
</script>

<style lang="scss">
.address-box{
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	
}
.address-col1{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 18px;
	font-style: italic;
	color: powderblue;
}
.address-col2{
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 18px;
	font-style: italic;
	color: powderblue;
}
.address-box-bottom{
	border-bottom: 5px solid plum;
}
</style>
