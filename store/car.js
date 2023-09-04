export default {
	// 当前模块开启命名空间
	namespaced: true,
	
	state:()=>({
		
		//cart 用来存购物车中的信息 
		// 读取本地存储的商品信息
		cart : JSON.parse(uni.getStorageSync('cart') || '[]') 
	}),
	//类似与method
	mutations:{
		// 添加商品到cart中
		addToCart(state,goods){
			// 根据goods_id判断查找商品
			const findResult = state.cart.find(x=>x.goods_id == goods.goods_id)
			
			// 没有商品加入
			if(!findResult){
				state.cart.push(goods)
			}
			// 有商品数量加1
			else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStoreage')
		},
		// 购物车信息本地化存储
		saveToStoreage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车信息
		updateCart(state,goods){
			
			const findResult2 = state.cart.find(x => x.goods_id = goods.goods_id)
			if(findResult2){
				findResult2.goods_state = goods.goods_state
				
				// 存储到本地
				this.commit('m_cart/saveToStoreage')
			}
		},
		// 更新商品数量
		upaddcount(state,goods){
			const findResult3 = state.cart.find(x => x.goods_id = goods.goods_id)
			if(findResult3){
				findResult3.goods_count = goods.goods_count
				
				// 存储到本地
				this.commit('m_cart/saveToStoreage')
				console.log(findResult3.goods_count)
			}
		},
		// 删除操作
		deletecart(state,goods_id){
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 存储到本地
			this.commit('m_cart/saveToStoreage')
		},
		// 全选区域
		updataChkeck(state,newState){
			return state.cart.forEach(x=> x.goods_state = newState)
			this.commit('m_cart/saveToStoreage')
		}
	},
	
	//类似与计算属性
	getters:{
		// 商品总数
		total(state){
			// let adds = 0
			// state.cart.forEach(goods => adds+= goods.goods_count)
			// 	 return adds
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		// 勾选商品总数
		checkedCount(state){
			// 过滤已勾选的商品    
			return state.cart.filter(x =>x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		// 计算总价格
		allprice(state){
			const stateprice = state.cart.filter(x =>x.goods_state)
			let add = 0
			stateprice.forEach(x=>{
				add +=x.goods_count*x.goods_price
			})
			return add.toFixed(2)
		}
	}
}