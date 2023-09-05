<template>
	<view>
		<view class="my-container"></view>
		<my-login v-if="!token"></my-login>
		
		
		<my-usrinfo v-else></my-usrinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badageMix  from "@/mixins/tabbar-badge.js"
	export default {
		mixins:[badageMix],
		computed:{
			...mapState('m_usr',['token']),
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page,.my-container{
	height: 100%;
}
</style>
