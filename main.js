import Vue from 'vue'
import App from './App'
// 导入 store 的实例对象
import store from './store/store.js'

// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'http://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})

	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: store.state.m_user.token,
		}
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
