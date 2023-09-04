// 封装购物红点

import { mapGetters} from 'vuex'
export default {
		computed:{
			...mapGetters('m_cart',['total'])
		},
		
		onShow(){
			this.setShow()
		},
		methods:{
			setShow(){
				// setTabBarBadge 为 tabBar 某一项的右上角添加文本
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			}
		}
		
	}