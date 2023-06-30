<template>
	<view>
		<view class="white">
			<view class="text-black">{{feedback.content}}</view>
			<view class="img-row" >
				<view v-for="(item,index) in feedback.file_list" :key="index" @click="catImage(item.url)">
					<image :src="item.url" class="image" mode="aspectFill"> </image>

				</view>
			</view>
			<view class="text-time">{{$util.formatTime(feedback.create_time)}}提交</view>

		</view>
		
		<view class="box">
			<view class="text-black">客服回复：</view>
			<view class="text-grey">您的反馈我们已经收到，我们会尽快处理并给您回复，给您造成的不便敬请谅解。感谢您的反馈与支持！</view>
			<view class="text-time">{{$util.formatTime(feedback.create_time)}}</view>
		</view>
		
		<view class="box" v-if="feedback.handle_time">
			<view class="text-black">客服回复：</view>
			<view class="text-grey">您的反馈我们已经收到，我们正在努力处理中，感谢您的反馈与支持</view>
			<view class="text-time">{{$util.formatTime(feedback.handle_time)}}</view>
		</view>

		<view class="box" v-if="feedback.complete_time">
			<view class="text-black">客服回复：</view>
			<view class="text-grey">已处理完毕</view>

			<view class="text-grey" style="margin-top: 20rpx;">是否解决了您的问题</view>
			<view class="flex-row">
				<view @click="resolve(true)" :class="isResolve&&isShow?'btn-resolve':'btn-normal'" class="btn-normal">
					<image src="../../../static/common/icon_solved_sel.png" class="icon-normal"
						v-if="isResolve&&isShow"></image>
					<image src="../../../static/common/icon_solved_nor.png" class="icon-normal" v-else></image>

					已解决
				</view>
				<view @click="resolve(false)" :class="!isResolve&&isShow?'btn-unResolve':'btn-normal'"
					class="btn-normal">
					<image src="../../../static/common/icon_notsolved_sel.png" class="icon-normal"
						v-if="!isResolve&&isShow"></image>
					<image src="../../../static/common/icon_notsolved_nor.png" class="icon-normal" v-else></image>
					未解决
				</view>
			</view>
			<view class="text-time">{{$util.formatTime(feedback.complete_time)}}</view>
		</view>

		<view class="box" v-if="feedback.reply&&isResolve&&isShow">
			<view class="text-black">客服回复：</view>
			<view class="text-grey">尊敬的用户您好，很高兴我们的答案能帮助到您。感谢您的支持!</view>
		</view>

		<view class="box" v-if="feedback.reply&&!isResolve&&isShow">
			<view class="text-black">客服回复：</view>
			<view class="text-grey">尊敬的用户您好，对于我们的答案没有帮助到您，我们感到十分抱歉。建议您详细描述您遇到的问题并重新提交意见反馈或者联系客服继续咨询，感谢您的支持!</view>
		</view>


		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback: {},
				isResolve: false,
				isShow: false

			}
		},
		onLoad(options) {
			this.feedback = JSON.parse(options.feedback);
			console.log(this.feedback.file_list)
		},

		methods: {


			resolve(isResolve) {

				if (!this.isShow) {
					this.isResolve = isResolve
					this.isShow = true;
				}


			},
			catImage(url) {
				uni.previewImage({
					urls: [url],
					current:0,
					longPressActions: {
						itemList: ['保存图片'],
					}
				})
				// uni.navigateTo({
				// 	url: '/pages/common/showImage/showImage?imgs=' + JSON.stringify(this.feedback.file_list) + '&current=' +
				// 		index,
				// 	animationType: "fade-in",
				// })
			}



		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		padding-bottom: 30rpx;
	}

	.white {
		background-color: #FFFFFF;
		padding: 45rpx 40rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.text-grey {
		color: #606266;
		font-size: 32rpx;
		line-height: 1.5em;
	}

	.text-time {
		color: #909193;
		font-size: 24rpx;
		text-align: end;
		margin-top: 30rpx;
	}

	.text-black {
		color: #303133;
		font-size: 32rpx;
		margin-bottom: 30rpx;
		font-weight: bold;
	}

	.box {
		background-color: #FFFFFF;
		border-radius: 30rpx;
		margin: 50rpx 30rpx;
		padding: 30rpx 30rpx;
	}

	.icon-normal {
		width: 25rpx;
		height: 25rpx;
		margin-right: 20rpx;
	}


	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 30rpx;
	}

	.btn-normal {
		border-radius: 40rpx;
		border: solid 1rpx #D2D2D2;
		color: #999999;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		width: 32%;
	}

	.btn-resolve {
		background-color: #E1FFFB;
		border: solid 1rpx #19CFB7;
		color: #19CFB7;

	}

	.btn-unResolve {
		border: solid 1rpx #FF5F5F;
		background-color: #FFF2F2;
		color: #FF5F5F;

	}



	.image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		margin: 10rpx;
	}

	.img-row {
		display: flex;
		flex-direction: row;

		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;

	}
</style>
