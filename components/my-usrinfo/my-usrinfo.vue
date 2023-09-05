<template>
	<view>
		<view class="my-userinfo-container">
			<!-- 头像区域 -->
			<view class="my-userinfo-box">
				<image :src="userinfo.avatarUrl"></image>
				<view class="nikename">{{userinfo.nickName}}</view>
			</view>
			<!-- 面板列表区域 -->
			<view class="my-userinfo-plane1-list">
				<!-- 第一个面板区域 -->
				<view class="plane-list">
					<view class="plane-box">
						<view class="box">
							<text>8</text>
							<text>收藏的店铺</text>
						</view>
						<view class="box">
							<text>14</text>
							<text>收藏的商品</text>
						</view>
						<view class="box">
							<text>18</text>
							<text>关注的商品</text>
						</view>
						<view class="box">
							<text>4</text>
							<text>足迹</text>
						</view>
					</view>
				</view>
				<!-- 第二个面板 -->
				<view class="plane-list">
					<view class="plane1">
						我的订单
					</view>
					<view class="plane-box">
						<view class="box">
							<image src="../../static/订单.png" class="icon"></image>
							<text>待付款</text>
						</view>
						<view class="box">
							<image src="../../static/待收货.png" class="icon"></image>
							<text>待收货</text>
						</view>
						<view class="box">
							<image src="../../static/退款.png" class="icon"></image>
							<text>退款/退货</text>
						</view>
						<view class="box">
							<image src="../../static/全部订单.png" class="icon"></image>
							<text>全部订单</text>
						</view>
					</view>
				</view>
				<!-- 第三个面板 -->
				<view class="plane-list">
					<view class="plan-item">
						<text>收货地址</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="plan-item">
						<text>联系客服</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="plan-item" @click="logout">
						<text>退出登录</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-usrinfo",
		computed:{
			...mapState('m_usr',['userinfo']),
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_usr',['updataUserinfo','updatatoken','updataAddress']),
			// 询问是否退出
			async logout(){
				const succ = await uni.showModal({
					title:'提示',
					content:'确定要退出吗？'
				}).catch(err=>err)
				
			if(succ && succ.confirm){
				this.updataUserinfo('{}')
				this.updatatoken('')
				this.updataAddress('{}')
				
			}
			},
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	.my-userinfo-box{
		background-color: powderblue;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 100px;
			height: 100px;
			border-radius: 50%;
			border: 2px solid plum;
			box-shadow: 0 1px 5px black;
		}
		.nikename{
			font-size: 30px;
			font-style: italic;
			color: pink;
			margin-top: 10px;
		}
	}
}
.my-userinfo-plane1-list{
	padding: 0 10px;
	position: relative;
	top: -20px;
	.plane-list{
		background-color: white;
		border-radius: 3px;
		.plane1{
			font-size: 17px;
			padding-left: 10px;	
		}
		.plane-box{
			display: flex;
			justify-content: space-around;
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				padding: 10px 0;
				font-size: 14px;
				.icon{
					width: 30px;
					height: 30px;
				}
			}
		}
	}
}
.plan-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
	line-height: 30px;
}
</style>