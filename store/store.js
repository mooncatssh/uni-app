import  Vue  from 'vue'
import Vuex from "vuex"
import moduleCart from './car.js'

Vue.use(Vuex)

const store =new Vuex.Store({
	modules:{
		'm_cart':moduleCart,
	}
})

export default store
