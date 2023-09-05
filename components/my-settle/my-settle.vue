<template>
	<view>
		<view class="settle-container">
			<label class="radio" @click="changeAarry">
			<radio color="#C00000" :checked="isFullCkeck" class="settle-box1"><text>全选</text></radio>
			</label>
			
			<view class="settle-box2">合计:
			<text>￥{{allprice}}</text>
			</view>
			
			<view class="settle-box3" @click="settlement">结算({{checkedCount}})</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['total','checkedCount','allprice','total']),
			// 收货地址
			...mapState('m_usr',['address','token']),
			
			...mapState('m_cart',['cart']),
			// 全选判断
			isFullCkeck(){
				return this.total == this.checkedCount
			},
		},
		// 监听商品总数的变化
		watch:{
			total(){
				this.tabs()
			}
		},
		data() {
			return {
				n:3,
				timer: null
			};
		},
		onShow(){
			this.tabs()
		},
		methods:{
			...mapMutations('m_cart',['updataChkeck']),
			...mapMutations('m_usr',['updatapages']),
			// 全选取消
			changeAarry(){
			 this.updataChkeck(!this.checkedCount)
			},
			// 添加总数的标签
			tabs(){
				// setTabBarBadge 为 tabBar 某一项的右上角添加文本
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			},
			// 结算按钮
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				if(!this.address) return uni.$showMsg('请选择收货地址！')
				if(!this.token) return this.delay()
				this.prices()
			},
			// 创建订单
			async prices(){
				// 请求参数
				const query ={
					order_price:10,
					consignee_addr: this.address,
					goods:this.cart.filter(x=>x.goods_state).map(x=>({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
						}))
				}
				// 请求拿到订单编号
				  const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',query)
				  if(res.meta.status!==200) return uni.$showMsg('创建订单失败')
				  // 得到订单编号
				  const ordernumber = res.message.order_number
				  
				  // 请求拿到预支付的参数
				 const{data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:ordernumber})
				 if(res2.meta.status!==200) return uni.$showMsg('预支付失败')
				 // 得到预支付需要的参数
				 const payinfo =res2.message.pay
				 
				 // 微信支付
				const succ = await uni.requestPayment(payinfo).catch(err=>err)
				if(err) return uni.$showMsg('支付失败')
				
				const{data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:ordernumber})
				if(res3.meta.status!==200) return uni.$showMsg('订单未支付')
				
				uni.showToast({
					title:'支付完成!',
					icon:'success'
				})
			},
			// 延迟导航到my
			delay(){
				this.n = 3
				this.showTips(this.n)
				
			    this.timer=setInterval(()=>{
					this.n--
					
					if(this.n <=0){
						clearInterval(this.timer)
						
						uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								this.updatapages({
									openType:'switchTab',
									from:'/pages/car/car'
								})
							}
						})
						
						return
					}
			this.showTips(this.n)
				},1500)
			},
			// 展示倒计时的提示
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算' + n +'秒后自动跳转到登录页',
					mask:true,
					duration:1500
				})
			}
		}
	}
</script>

<style lang="scss">
.settle-container{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 50px;
	z-index: 999;
	background: #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	.settle-box1{
		
	}
	.settle-box2{
	display: flex;
	align-items: center;
		text{
			color: red;
		}
	}
	.settle-box3{
		background-color: red;
		color: white;
		text-align: center;
		line-height:50px;
		width: 100px;
		height: 100%;
		
		
	}
}
</style>