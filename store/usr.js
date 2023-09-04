export default {
	namespaced: true,
	
	
	state:() =>({
		// 收货地址 读取本地json类型的对象信息
		address:JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations:{
		// 更新收货地址
		updataAddress(state,address){
			state.address = address
			
			this.commit('m_usr/saveAddressToStorage')
		},
		// 将address持久存储到本地转换为json类型
		saveAddressToStorage(state){
			uni.getStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	getters:{
		addStr(state){
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}