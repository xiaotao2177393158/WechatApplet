<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
				<!-- 为组件绑定动态数据 -->
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '', // 查询关键字
					cid: '', // 商品分类id
					pagenum: 1,
					pageSize: 10
				},
				goodsList: [], // 商品列表数据
				total: 0, // 总数量
				isloading: false,     // 节流处理
			};
		},
		onLoad(options) {
			// 获取页面跳转时携带的参数
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// 获取商品列表数据
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading = false
				// 只要数据请求完毕 就立即按需调用 cb 回调函数
				// 关闭下拉刷新效果
				cb && cb()
				
				if (res.meta.status !== 200) return nui.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]   // 新旧数据拼接 拉动获取的数据
				this.total = res.message.total
			},
			// 点击跳转到商品详情页面
			gotoDetail(item) {
			  uni.navigateTo({
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
			}
		},
		// 上拉加载数据
		onReachBottom() {
			// 判断是否还有数据
			if(this.queryObj.pagenum * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕！！')
			if(this.isloading) return   // 节流
			this.queryObj.pagenum += 1   // 页码加一
			this.getGoodsList()    // 重新获取数据 
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 重置数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			
			// 重新发起请求
			this.getGoodsList(() => nui.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	
</style>
