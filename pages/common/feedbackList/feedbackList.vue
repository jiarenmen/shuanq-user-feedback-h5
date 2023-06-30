<template>
	<view class="page">
		<view v-for="(item,index) in feedbacks" :key="index" @click="feedbackClick(item)">
			<view class="list-box">
				<view class="text-title">{{item.title}}</view>
				<view class="text-tips">{{item.content}}。</view>
				<view class="text-time">{{$util.formatTime(item.create_time)}}</view>
				<view v-if="item.handle_status===0" class="state-grey">待处理</view>
				<view v-if="item.handle_status===1" class="state-blue">处理中</view>
				<view v-if="item.handle_status===2 || item.handle_status===3" class="state-green">已处理</view>
			</view>
		</view>
		<view style="height: 50px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbacks: [],
			}
		},
		onLoad() {
			this.getUserFeedback();
		},
		methods: {
			//获取用户意见反馈列表
			async getUserFeedback() {
				uni.showLoading({
					title:"加载中..."
				})
				await this.$api.getFeedbackDataList({
					appid:window.config.appid,
					device_code:window.config.auth,
					limit:-1,
				}).then((response) => {
					uni.hideLoading()
				    const res = response.data
				    if (res.code === 1) {
						this.feedbacks=res.data.list
				    }else{
						uni.showToast({
							icon: "none",
							title: res.message
						});
					}
				})
			},
			feedbackClick(item) {

				uni.navigateTo({
					//url: '/pages/common/feedbackDetail/feedbackDetail?' + 'id=' + item.id,
					url: '/pages/common/feedbackDetail/feedbackDetail?' + 'feedback=' + JSON.stringify(item),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},


		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.text-title {
		color: #303133;
		font-size: 30rpx;
		font-weight: bold;
		margin-right: 100rpx;
	}

	.text-time {
		color: #909193;
		font-size: 24rpx;
		margin-top: 24rpx;
	}

	.text-tips {
		color: #bcbcbc;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 22rpx;
		margin-right: 100rpx;
	}

	.state-green {
		position: absolute;
		right: 0;
		top: 0;
		color: #07C160;
		font-size: 28rpx;
		padding: 30rpx;
	}
	
	.state-blue {
		position: absolute;
		right: 0;
		top: 0;
		color: #0055ff;
		font-size: 28rpx;
		padding: 30rpx;
	}

	.state-grey {
		position: absolute;
		right: 0;
		padding: 30rpx;
		top: 0;
		color: #606266;
		font-size: 28rpx;
	}



	.list-box {
		position: relative;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding: 30rpx;
	}



	.flex-col {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
</style>
