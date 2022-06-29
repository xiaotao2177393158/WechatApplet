<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius': redius + 'px'}" @click="searchBoxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {  // 背景颜色
				type: String,
				default: '#c00000'
			},
			redius: {   // 圆角
				type: Number,
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchBoxHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
	  // background-color: #c00000;
	  height: 50px;
	  padding: 0 10px;
	  display: flex;
	  align-items: center;
	}
	
	.my-search-box {
	  height: 36px;
	  background-color: #ffffff;
	  // border-radius: 15px;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	
	  .placeholder {
	    font-size: 15px;
	    margin-left: 5px;
	  }
	}
</style>
