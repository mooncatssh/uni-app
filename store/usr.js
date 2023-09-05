export default {
	namespaced: true,
	
	
	state:() =>({
		// 收货地址 读取本地json类型的对象信息
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		// 验证token
		token:uni.getStorageSync('token') || '"0a1LF90w3XUfi13TNR0w3hMDha0LF90q"',
		// 用户对象 读取本地json类型的对象信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{ "avatarUrl":"../../static/T_7DR))RXA]K0@ABVQUN}(F.jpg","nickName":"欧尼酱"}')}),
		// 存储页面信息
		redierct:null,
	mutations:{
		// 更新收货地址
		updataAddress(state,address){
			state.address = address
			
			this.commit('m_usr/saveAddressToStorage')
		},
		// 将address持久存储到本地转换为json类型
		saveAddressToStorage(state){
			uni.getStorageSync('address',JSON.stringify(state.address))
		},
		// 将userinfo持久存储到本地中
		saveUserinfo(state){
			uni.getStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 将token持久存储到本地
		saveToken(state){
			uni.getStorageSync('token',JSON.stringify(state.token))
		},
		// 更新用户的基本信息
		updataUserinfo(state,userinfo){
			state.userinfo = userinfo
			this.commit('m_usr/saveUserinfo')
		},
		// 存储token
		updatatoken(state,token){
			state.token = token
			this.commit('m_usr/saveToken')
		},
		// 更新重定向页面
		updatapages(state,info){
			state.redierct = info
		}
		
	},
	
	getters:{
		addStr(state){
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}