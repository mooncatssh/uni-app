import App from './App'
import store from '@/store/store.js'
//导入网络请求的包
import {$http} from '@escook/request-miniprogram'

uni.$http = $http 
//全局根路径
$http.baseUrl="https://api-hmugo-web.itheima.net"
//请求拦截器
$http.beforeRquest = function(options){
		uni.showLoading({
			title:'数据请求中...'
		})
	// 判断当前请求的是否为有权限的接口,如果包含，则返回子字符串在字符串中的索引位置；
	//如果不包含，则返回-1。如果包含，则返回子字符串在字符串中的索引位置；如果不包含，则返回-1。
	if(options.url.indexof('/my/') !== -1){
		options.header = {
			Authorization: store.state.m_usr.token,
		}
	}
}
//响应拦截器
$http.afterRquest = function(options){
	uni.hideLoading()
}
//封装弹框的方法
uni.$showMsg=function(title='数据加载失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif