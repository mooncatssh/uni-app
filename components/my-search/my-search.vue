<template>
	<view class="my-search-container" :style="{'background-color': bacolor}" @click="searcherBoxHandler">
		<!-- 输入框 -->
	<view class="my-search-box" :style="{'border-radius': radio + 'px'}">
		<uni-icons type="search" size="20px" ></uni-icons>
		<text class="placeholer">搜索</text>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			//背景颜色
			bacolor:{
				type:String,
				default: '#d0c0ff'
			},
			//圆角尺寸
			radio:{
				type:Number,
				default: 20 
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			searcherBoxHandler(){
				console.log('111')
				this.$emit('myclick')
			}
		}
}
</script>

<style lang="scss">
.my-search-container{
	height:40px ;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		background-color: white;
		width: 100%;
		.placeholer{
			font-style: italic;
			font-size: 20px;
			color: plum;
		}
	}
}
</style>
