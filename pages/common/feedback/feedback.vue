<template>
	<view class="feedback-body">

		<text class="text-black">问题反馈和意见建议
		<text style="color: red;">*</text></text>
		<liu-checkBox checkType="single" :checkOptions="classify_list" :activeColor="'#007AFF'" @checkChange="checkClassifyChange"></liu-checkBox>
		<textarea placeholder="请描述您遇到的问题或对本产品的建议..." v-model="sendData.content" class="feedback-textare" maxlength="-1"/>
		<view class="image-title">
			<text class="text-black">上传问题截图<text class="text-grey"> (选填，最多可上传6张)
				</text>
			</text>
			<view v-if="$refs.files" class="text-grey">{{ $refs.files.files.length }}/6</view>
		</view>
		<view class="filepicker">
			<uni-file-picker 
				file-mediatype="image" 
				ref="files" 
				:limit="6" 
				return-type="array" 
				v-model="image_list" 
				></uni-file-picker>
		</view>

		<text class="text-black">联系方式<text class="text-grey">(选填)</text> </text>
		<input class="feedback-input" v-model="sendData.contact_info" placeholder="请输入您的联系方式" />
		<view style="margin-bottom: 100px;"></view>
		<view class="btn">
			<button :disabled="!sendData.content || btnLoading" :loading="btnLoading" type="primary" @click="submit">
				提交
			</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sendData: {
					title: '', //反馈内容
					content: '', //反馈内容
					contact_info: '', //联系方式
					classify_id:0,
				},
				image_list: [],
				btnLoading: false,
				classify_list: [{
					id: 0,
					name: '其他问题',
					selected:true
				}],
			};
		},
		async onLoad() {
			uni.showLoading({
				title:"加载中..."
			})
			await this.$api.getFeedbackClassifyList({
				appid:window.config.appid,
			}).then((response) => {
				const res = response.data
				if (res.code === 1) {
					this.classify_list=[...this.classify_list,...res.data.list]
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
			checkClassifyChange(data){
				this.sendData.classify_id=data[0].id
				this.sendData.title=data[0].name
				console.log(data)
			},
			async submit(){
				this.btnLoading=true
				let image_list=this.$refs.files.files
				console.log(image_list)
				let file_ids=[]
				let continue_submit=true
				if(image_list.length){
					uni.showLoading({
						title:"上传中..."
					})
					
					//这里注意不能用forEach方法循环，否则值是异步更改的，并不是同步的
					for (var i = 0; i < image_list.length; i++) {
						if(continue_submit){
							const file = image_list[i];
							await this.$api.fileUpdate(file).then((file_id)=>{
								console.log('上传成功',file_id)
								file_ids.push(file_id)
							}).catch((errmsg)=>{
								uni.hideLoading()
								this.btnLoading=false
								uni.showToast({
									icon: "none",
									title: '第' + (i + 1) + '张,' + errmsg
								});
								continue_submit=false
							})
						}
					}
				}
				if(!continue_submit){
					return
				}
				console.log('file_ids',file_ids)
				uni.showLoading({
					title:"提交中..."
				})
				await this.$api.pushFeedbackInfo({
					appid:window.config.appid,
					device_info:window.config.device_info,
					device_code:window.config.auth,
					file_ids:file_ids.join(),
					...this.sendData
				}).then((response) => {
					uni.hideLoading()
					this.btnLoading=false
				    const res = response.data
				    if (res.code === 1) {
				        uni.showToast({
				        	title:"提交成功"
				        })
						this.sendData.content=""
						this.sendData.contact_info=""
						this.$refs.files.clearFiles()
				    }else{
						uni.showToast({
							icon: "none",
							title: res.message
						});
					}
				})
				
			},
			// select(e){
			// 	console.log(e)
			// 	this.image_list=[...this.image_list,...e.tempFiles]
			// },
			// delimg(e){
			// 	console.log(e)
				
			// 	if (!Array.indexOf){
			// 	    Array.prototype.indexOf=function(obj){
			// 	    var i=this.length;
			// 	        while(i-=1){
			// 	            if(this[i]==obj){
			// 	                return i;
			// 	            }
			// 	        }return -1;
			// 	    }
			// 	}
				
			// 	let index=0
			// },
		}
	};
</script>

<style>
	.text-black {
		color: #303133;
		font-size: 32rpx;
	}

	.text-grey {
		color: #BCBCBC;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.feedback-quick {
		padding-right: 10rpx;
		color: #606266;
		font-size: 32rpx;
	}

	.feedback-body {
		padding: 30rpx;
	}

	.feedback-textare {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 266rpx;
		color: #303133;
		font-size: 28rpx;
		line-height: 2em;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #F5F6F8;
	}

	.feedback-input {
		font-size: 28rpx;
		color: #303133;
		background-color: #F5F6F8;
		border-radius: 20rpx;
		height: 100rpx;
		min-height: 100rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
		margin-bottom: 60rpx;
	}



	.btn-submit {
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-top: 100rpx;
		background-color: #007AFF;
		margin-bottom: 70rpx;
	}

	.image-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #606266;

	}

	.filepicker {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 0 ;
		right: 0;
		margin: 30rpx 30rpx 60rpx 30rpx;
	}
</style>
