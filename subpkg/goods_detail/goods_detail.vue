<template>
	<view v-if="goodsinfo.goods_name" class="goodsbox">
		<!-- 轮播图区域 -->
		<swiper :autoplay="true" 
		:interval="2000" 
		:duration="1000"
		:circular="true">
			<swiper-item v-for="(item,i) in goodsinfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品价格区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{goodsinfo.goods_price}}</view>
			<!-- 描述区域 -->
			<view class="goods-info-item">
				<view class="goods-info-1">{{goodsinfo.goods_name}}</view>
				<view class="goods-info-2">
					<uni-icons type="star" size="17"></uni-icons>
					<tex>收藏</tex>
				</view>
			</view>
			<view class="goods-info-bottom">快递:免运费 {{cart.length}}</view>
			
			<rich-text :nodes="goodsinfo.goods_introduce"></rich-text>
		</view>
		<view class="goods-carts">
					<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
						@buttonClick="buttonClick" />
				</view>
	</view>
	
</template>

<script>
	import {mapState , mapMutations, mapGetters} from 'vuex'
	export default {
		// 映射m_cart中的cart商品信息
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total']),
		},
		// 监听
		watch: {
			// 监听购物车的数量变化
				total:{
					handler(newVal){
					//找到options中的购物车元素
					const findResult = this.options.find(x => x.text == '购物车' )
					if(findResult){
						findResult.info = newVal
					}
				},
				immediate:true
				}
		},
		data() {
			return {
				//商品详情列表
				goodsinfo:{},
				// 左侧按钮
				options: [{
							icon: 'headphones',
							text: '店铺'
						}, {
							icon: 'shop',
							text: '购物车',
							info: 0,
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
				
			};
		},
		onLoad(options){
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)
		},
		methods:{
			...mapMutations('m_cart',['addToCart']),
			// 获取商品详情页
			async getGoodsInfo(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status!==200) return uni.$showMsg()
				
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style=display:block;').replace(/webp/g,'jpg')
				this.goodsinfo = res.message
				
			},
			preview(i){
				//调用 uni.previewImage()方法预览图片
				uni.previewImage({
					current:i,
					//所有图片的url地址
					urls:this.goodsinfo.pics.map(x =>x.pics_big)
				})
			},
			// 商品购物车底层栏
			onClick (e) {
				    if(e.content.text === '购物车'){
						uni.switchTab({
							url:'/pages/cart/cart'
						})
					}
				  },
			buttonClick (e) {
				    if(e.content.text === '加入购物车'){
						// 新建goods对象存储商品信息
						const goods = {
							goods_id: this.goodsinfo.goods_id,
							goods_name: this.goodsinfo.goods_name,
							goods_price: this.goodsinfo.goods_price,
							goods_count:1,         //商品数量
							goods_big_logo: this.goodsinfo.goods_small_logo,
							goods_state:true       //商品的勾选状态
						}
						console.log(goods)
						this.addToCart(goods)
					}
				    
				  }
		}
	}
</script>

<style lang="scss">
	.goodsbox{
		padding-bottom: 50px;
	}
swiper{
	height: 750rpx;
	
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding-top: 10px;
	.goods-price{
		color: yellow;
		font-size: 30px;
		font-style: italic;
	}
	.goods-info-item{
		display: flex;
		justify-content: space-between;
		.goods-info-1{
			width: 240px;
			font-style: italic;
			color: plum;
			font-size: 15px;
		}
		.goods-info-2{
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-right: 10px;
			font-style: italic;
			color: plum;
			font-size: 15px;
		}
	}
	.goods-info-bottom{
		padding-top: 10px;
		font-style: italic;
		color: pink;
		font-size: 15px;
	}
}
.goods-carts{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	
	
	
}
</style>
