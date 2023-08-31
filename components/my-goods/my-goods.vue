<template>
		<view class="goods_item">
			<!-- 左侧 -->
			<view class="goods_item_left">
				<image :src="item.goods_big_logo"></image>
			</view>
			<!-- 右侧 -->
			<view class="goods_item_right">
				<view class="goods-list_name">{{item.goods_name}}</view>
				<view class="goods_item_right_1">
					<view class="goods-list_price">￥{{item.goods_price}}</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.goods_item{
	height: 130px;
	display: flex;
	justify-content: space-between;
	.goods_item_left{
		width: 150px;
		height: 150px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.goods_item_right{
		display: flex;
		flex-direction: column;//纵向两端对齐
		justify-content: space-between;
		width: 300px;
		.goods-list_name{
			
			color: pink;
			font-size: 15px;
			font-style: italic;
		}
		.goods_item_right_1{
			
		}
		.goods-list_price{
			color: yellow;
			font-size: 20px;
			font-style: italic;
		}
	}
}

</style>