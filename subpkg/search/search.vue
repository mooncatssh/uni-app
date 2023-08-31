<template>
	<view>
	<view class="search-box">
		<uni-search-bar @confirm="search" @input="input" :radius="100" cancelButton="none"></uni-search-bar>
	</view>
	<!-- 搜索列表 -->
	<view class="search-list" v-if="searchResult.length !== 0">
		<view class="search-list-item" v-for="(item,i) in searchResult" :key="i" @click="gotodetail(item.goods_id)">
			<view class="searchlist">{{item.goods_name}}</view>
			<uni-icons type="arrowright" size="16" ></uni-icons>
		</view>
	</view>
	<!-- 历史搜索列表 -->
	<view class="search-history-box" v-else>
		<!-- 标题区域 -->
		<view class="search-history-item">
			<view>历史搜索</view>
			<uni-icons type="trash-filled" size="25" @click="clear"></uni-icons>
		</view>
		<!-- 搜索列表 -->
		<view class="search-history-list">
		<view class="search-i" v-for="(item,i) in histories" :key="i" @click="gogoods_list(item)">
			{{item}}
		</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				//搜索参数
				kw:'',
				//搜索的结果列表
				searchResult:[],
				//历史搜索列表
				historyList:[]
			};
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageInfoSync('kw')|| '[]')
		},
		methods:{
			input(e){
				//计时器
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearch()
				},500)	
			},
			//搜索列表请求
			async getSearch(){
				if(this.kw == ''){
					return this.searchResult = []
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				
				this.getHistoryList()
			},
			//点击跳转商品详情页
			gotodetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
				})
			},
			//点击跳转商品列表
			gogoods_list(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list? query=' +kw
				})
			},
			//搜索历史请求
			getHistoryList(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
			 	
				this.historyList = Array.from(set)
				//将搜索历史存到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clear(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			}
		}
	}
</script>

<style lang="scss">
.uni-search-bar{
	display: flex;
	flex-direction: row;
	position: relative;
	padding: 16rpx;
	background-color: #d0c0ff;
}
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #d0c0ff;
}
.search-list-item{
	background-color: #ffffff;
	display: flex;
	padding-bottom: 20px;
	border-bottom: 1px solid plum;
	align-items: center;//垂直居中对齐
	justify-content: space-between;//两端对齐，间隔相等
	.searchlist{
		overflow: hidden;
		white-space: nowrap;//文本不允许换行
		color: #d0c0ff;
		font-size: 18px;
		font-style: italic;
		text-overflow: ellipsis;//文本超出用....
	}
}
.search-list{
	padding: 5px;
}
.search-history-box{
	.search-history-item{
		display: flex;
		justify-content: space-between;
		color: #d0c0ff;
		font-size: 20px;
		font-style: italic;
		padding-bottom: 5px;
		align-items: center;
	}
	.search-history-list{
		display: flex;
		color: #d0c0ff;
		margin-top: 10px;
		font-size: 20px;
		font-style: italic;
		.search-i{
			margin-left: 10px;
		}
	}
}
</style>
