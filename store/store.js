import  Vue  from 'vue'
import Vuex from "vuex"
import moduleCart from './car.js'
import  moduleUsr from './usr.js'
Vue.use(Vuex)

const store =new Vuex.Store({
	modules:{
		'm_cart':moduleCart,
		'm_usr' :moduleUsr
	}
})

export default store
