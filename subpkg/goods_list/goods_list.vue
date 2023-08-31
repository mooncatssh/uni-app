<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,i) in goods_list" :key="i" @click="gogoods_detail(item)">
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品请求参数
				querObejct:{
					query:'',
					cid:'',
					pagenum: 1,
					pagesize: 5
				},
				//商品详情列表
				goods_list:[],
				total:0,
				// 控制请求闸,防止发起额外的请求
				isLoading:false
			};
		},
		onLoad(options){
			this.querObejct.query = options.query || ''
			this.querObejct.cid = options.cid || ''
			this.getGoods_list()
		},
		methods:{
			// 获取商品详情列表
			async getGoods_list(cb){
				// 开启请求
				this.isLoading = true
				const{data:res} = await uni.$http.get('/api/public/v1/goods/search',{query:this.querObejct.query,cid:this.querObejct.cid})
				// 关闭请求
				this.isLoading = false
				// 数据请求完成，调用stopPullDownRefresh()，关闭刷新
				cb  &&cb()
				if(res.meta.status!==200) return uni.$showMsg()
				
				// 将旧数据和新数据进行拼接
				this.goods_list = [...this.goods_list,...res.message.goods]
				
				this.total = res.message.total
				console.log(this.goods_list)

			},
			gogoods_detail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		//触发函数下拉增加
		onReachBottom(){
			// 提示是否加载完毕
			if(this.querObejct.pagenum * this.querObejct.pagesize >=this.total) return uni.$showMsg('数据已经加载完毕!')
			if(this.isLoading) return
			//让页码值自增+1
			this.querObejct.pagenum++
			this.getGoods_list()
		},
		// 下拉刷新处理函数
		onPullDownRefresh(){
			this.querObejct.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goods_list = []
			
			this.getGoods_list(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
