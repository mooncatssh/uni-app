<template>
	<view>
		<!-- 搜索栏 -->
		<my-search @myclick="gosearcher"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的划动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{ height:wh + 'px'}" :scroll-top="scrollTop">
				<block v-for="(item,i) in catelist" :key="i">
					<view :class="['left-scroll-view-item',i==active?'active':'']" @click="checkactive(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的划动区 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{ height:wh + 'px'}">
				<view class="cate-v2" v-for="(item2,i2) in catelist2" :key="i2">
					<view class="cate-v2-title">{{item2.cat_name}}</view>
					<!-- 三级渲染 -->
					<view class="cate-v3-list" >
						<view class="cate-v3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gogoods_list(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
</view>
	
</template>

<script>
	import badageMix  from "@/mixins/tabbar-badge.js"
	export default {
		mixins:[badageMix],
		data() {
			return {
				//当前可使用的屏幕高度
				wh:0,
				//商品分类
				catelist:[],
				active:0,
				catelist2:[],
				scrollTop:0
			};
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight-40
			this.getCateList()
		},
		methods:{
			//获取商品分类
			async getCateList(){
				const{data:res} = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if(res.meta.status!==200) return uni.$showMsg()
				this.catelist = res.message
				//为二级分类
				this.catelist2 = res.message[0].children
				
			},
			//点击切换active
			checkactive(i){
				this.active = i
				//切换获取的二级分类
				this.catelist2 = this.catelist[i].children
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			gogoods_list(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
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
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			background-color: white;
			color: plum;
			line-height: 60px;
			text-align: center;
			font-size: 15px;
			font-style: italic ;
			
			&.active{
				background-color: #ffffff;
				position: relative;
				
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #27BA9B;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-v2-title{
	font-size: 30px;
	font-style: italic;
	color: pink;
	text-align: center;
	padding: 15px 0;
}
.cate-v3-list{
	display: flex;
	flex-wrap: wrap;
	.cate-v3-item{
		width: 75px;
		display: flex;
		flex-direction: column;//垂直排列
		justify-content: center;//主轴上居中对齐
		align-items: center;//纵向文本居中对齐
		image{
			width: 60px;
			height: 60px;
		}
		text{
			color: pink;
			font-size: 17px;
			font-style: italic;
		}
	}
}
</style>
