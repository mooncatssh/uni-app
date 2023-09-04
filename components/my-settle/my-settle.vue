<template>
	<view>
		<view class="settle-container">
			<label class="radio" @click="changeAarry">
			<radio color="#C00000" :checked="isFullCkeck" class="settle-box1"><text>全选</text></radio>
			</label>
			
			<view class="settle-box2">合计:
			<text>￥{{allprice}}</text>
			</view>
			
			<view class="settle-box3">结算({{total}})</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['total','checkedCount','allprice','total']),
			// 全选判断
			isFullCkeck(){
				return this.total == this.checkedCount
			},
		},
		// 监听商品总数的变化
		watch:{
			total(){
				this.tabs()
			}
		},
		data() {
			return {
				
			};
		},
		onShow(){
			this.tabs()
		},
		methods:{
			...mapMutations('m_cart',['updataChkeck']),
			// 全选取消
			changeAarry(){
			 this.updataChkeck(!this.checkedCount)
			},
			// 添加总数的标签
			tabs(){
				// setTabBarBadge 为 tabBar 某一项的右上角添加文本
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			}
		}
	}
</script>

<style lang="scss">
.settle-container{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	z-index: 999;
	background: #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	.settle-box1{
		
	}
	.settle-box2{
	display: flex;
	align-items: center;
		text{
			color: red;
		}
	}
	.settle-box3{
		background-color: red;
		color: white;
		text-align: center;
		line-height:50px;
		width: 100px;
		height: 100%;
		
		
	}
}
</style>