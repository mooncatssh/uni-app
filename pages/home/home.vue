<template>
	<!-- 搜索栏 -->
	<view>
	<view class="search-box">
		<my-search @myclick="gosearcher"></my-search>
	</view>
	<view>
		<!-- 轮播图区域 -->
		<swiper 
		:autoplay="true" 
		:interval="2000" 
		:duration="1000"
		:circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<!-- 动态绑定图片的src值 -->
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
	<!-- 分类导航条  -->
	<view class="nav-list">
		<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
			<image :src="item.image_src" class="nav-img"></image>
		</view>
	</view>
	<!-- 楼层区域 -->
	<view class="floor-list"> 
		<!-- 楼层item -->
		<view class="floor-list" v-for="(item,i) in floorList" :key="i">
			<image :src="item.floor_title.image_src" class="floor-title"></image>
			<!-- 图片区域 -->
			<view class="image-box">
				<!-- 左侧图片区域 -->
				<navigator class="image-left" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" 
					:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				</navigator>
				<!-- 右侧图片区域 -->
				<view class="right-box-image">
				<navigator  class="image-right" v-for="(item2,i2) in item.product_list" 
				:key="i2" v-show="i2 !== 0" :url="item2.url">
					<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
				</navigator>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据列表
				swiperList:[],
				//分类导航的数据列表
				navList:[],
				//楼层
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			//获取轮播图
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200) return uni.$showMsg()
				this.swiperList = res.message
			},
			//获取导航条
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200) return uni.$showMsg()
				this.navList = res.message
				
				
			},
			navClickHandler(item){
				if(item.name=='分类'){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			//获取楼层
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) return uni.$showMsg()
				//对数据进行处理
				res.message.forEach(floor =>{
					floor.product_list.forEach(prod =>{
						prod.url='/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				console.log(this.floorList)
			},
			gosearcher(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img{
		width: 128rpx;
		height: 140rpx;
	}
	
}
.floor-title{
	height: 60rpx;
	display: flex;
	width: 100%;
}
.right-box-image{
	display: flex;//弹性盒子布局
	flex-wrap: wrap;//排列可换行
}
.image-box{
	display: flex;
}
.search-box{
	//设置吸顶效果
	position: sticky;
	//吸顶位置
	top: 0;
	
	z-index:999
}
</style>
