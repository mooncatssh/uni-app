<template>
		<view class="goods_item">
			<!-- 左侧 -->
			<view class="goods_item_left">
				<radio v-show="showPage" :checked="item.goods_state" color="#C00000" @click="radioChange(item)"></radio>
				<image :src="item.goods_big_logo"></image>
			</view>
			<!-- 右侧 -->
			<view class="goods_item_right">
				<view class="goods-list_name">{{item.goods_name}}</view>
				<view class="goods_item_right_1">
					<view class="goods-list_price">￥{{item.goods_price}}</view>
					<!-- 文字输入框 -->
					<uni-number-box v-show="showPage" :min="1" :value="item.goods_count" @change="changeValue" />
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
			},
		    showPage:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			//radio的点击事件
			radioChange(item){
				this.$emit('radiao',{
					goods_id: item.goods_id,
					goods_state: !item.goods_state
				})
			},
			// 点击增加
			changeValue(value) {
				this.$emit('add',{
					goods_id:this.item.goods_id,
					goods_count: +value
				})
			},
		}
	}
</script>

<style lang="scss">
.goods_item{
	height: 130px;
	display: flex;
	justify-content: space-between;
	.goods_item_left{
		display: flex;
		justify-content: space-between;
		align-items: center;
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
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.goods-list_price{
			color: yellow;
			font-size: 20px;
			font-style: italic;
		}
	}
}

</style>