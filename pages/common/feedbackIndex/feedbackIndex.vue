<!-- 帮助反馈页面 -->
<template>
	<view>
		<view class="text-top">常见问题</view>
		<view class="bg-list">
			<view v-for="(item,index) in helpList" :key="index" :title="item.problemTitle" class="list-title">
				<view class="text-title">{{item.category}}</view>
				<view v-for="(help,helpIndex) in item.list" :key="helpIndex" class="list-question"
					hover-class="hover" @click="onClick(help)">
					<view class="text-item">{{help.title}}</view>
					<view class="line" v-if="helpIndex!=item.list.length-1"></view>
				</view>
		
			</view>
		</view>
		<view class="bg-box">
			<view class="bg-white-box">
				<image src="../../../static/common/icon-letter.png" class="image"></image>
				<view class="text-feedback" hover-class="hover" @click="toFeedbackList">我的反馈</view>

				<view class="vertical-line"></view>

				<image src="../../../static/common/icon-edit.png" class="image"></image>
				<view class="text-feedback" hover-class="hover" @click="toFeedback">我要反馈</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpList:[],
			}
		},
		async onLoad(e) {
			uni.showLoading({
				title:"加载中..."
			})
			await this.$api.getFeedbackConfig({
				appid:window.config.appid,
			}).then((response) => {
			    const res = response.data
			    if (res.code === 1) {
					this.helpList=res.data.helpList
			    }else{
					uni.showToast({
						icon: "none",
						title: res.message
					});
				}
			})
			uni.hideLoading()
		},
		methods: {
			onClick(item) {
				uni.navigateTo({
					url: '/pages/common/helpDetail/helpDetail?title=' + item.title + '&content=' + item.content,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
			toFeedbackList() {
				uni.navigateTo({
					url: '/pages/common/feedbackList/feedbackList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toFeedback() {
				uni.navigateTo({
					url: '/pages/common/feedback/feedback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		height: 100%;
	}



	.bg-box {
		background-color: #F8F8F8;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.bg-list {
		margin-bottom: 100rpx;
		background-color: #FFFFFF;
		padding: 30rpx
	}

	.bg-white-box {
		background-color: #FFFFFF;
		margin: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		border-radius: 20rpx;
		color: #303133;
		font-size: 32rpx;
	}

	.vertical-line {
		height: 20rpx;
		background-color: #cecece;
		width: 2rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.line {
		width: 100%;
		height: 1rpx;
		background-color: #F5F5F5;
	}



	.text-title {
		color: #303133;
		font-size: 32rpx;
		font-weight: bold;
	}

	.text-item {
		color: #999999;
		font-size: 28rpx;
		padding: 24rpx;
	}

	.list-title {
		margin-bottom: 30rpx;
	}

	.list-question {
		color: #606266;
		font-size: 28rpx;
	}

	.hover {
		background-color: #eee;
		opacity: 0.6;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
	}

	.text-feedback {
		padding: 20rpx;
	}

	.text-top {
		margin: 30rpx;
		color: #999999;
		font-size: 28rpx;
	}
</style>
