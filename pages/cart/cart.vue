<template>
	<view>
		<view class="cart-container" v-if="cart.length !==0">
		<!-- 收货地址 -->
			<my-address></my-address>
		<!-- 购物车图标 -->
		<view class="cart-little">
			<uni-icons type="shop" size="30px"></uni-icons> 
			<text class="cart-little-text">购物车</text>
		</view>		
		<!-- 滑动删除区域 -->
		<uni-swipe-action>
			<block v-for="(item,i) in cart" :key="i">
			<uni-swipe-action-item :right-options="options" @click="onClick(item)" >
				<!-- 商品列表区域 -->
				<my-goods :item="item" :showPage="true" @radiao="clickCjange" @add="clickadd"></my-goods>
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
		</view>
		<view class="cart-down" v-else>
		   <text class="text">购物车空空如也</text>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
     import badageMix  from "@/mixins/tabbar-badge.js"
	export default {
		mixins:[badageMix],
		computed:{
			...mapState('m_cart',['cart']),
		},
		data() {
			return {
				options:[
				        {
				            text: '删除',
				            style: {
				                backgroundColor: '#007aff'
				            }
				        }],
			};
		},
		methods:{
			...mapMutations('m_cart',['updateCart','upaddcount','deletecart']),
			// 点击勾选改变
			clickCjange(e){
				this.updateCart(e)		
			},
			// 增加商品
			clickadd(e){
				this.upaddcount(e)
			},
			// 删除操作
			onClick(item){
				this.deletecart(item.goods_id)
			}
			
		}
}
		
</script>

<style lang="scss">
.cart-little{
	height: 50px;
	display: flex;
	padding-left: 10px;
	align-items: center;
	.cart-little-text{
		
		padding-left: 5px;
	}
}
.cart-down{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 200px;
	.text{
		font-size: 30px;
		color: plum;
		margin-top: 10px;
	}
}
</style>
