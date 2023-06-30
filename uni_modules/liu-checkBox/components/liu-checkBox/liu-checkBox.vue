<template>
	<view>
		<view class="zcks-card">
			<view class="craditem" v-for="(item,index) in newCheckOptions" :key="index" :class="{'active': item.selected}"
				:style="{ '--color': activeColor }"
				@click="selectData(index,item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//选项数据
			checkOptions: {
				type: Array,
				default () {
					return []
				}
			},
			//选择类型  单选 single
			checkType: {
				type: String,
				default: ''
			},
			//复选时最大可选数量   类型为单选的时候不生效
			maxNum: {
				type: Number,
			},
			//选中主题颜色
			activeColor: {
				type: String,
				default: '#0A4B9D'
			}
		},
		watch:{
			checkOptions:{
				handler(newObj,oldObj){
					this.newCheckOptions=newObj
				},
				immediate:true,
				deep:true
			}
		},
		data() {
			return {
				newCheckOptions: []
			}
		},
		mounted() {
			this.newCheckOptions = this.checkOptions
		},
		methods: {
			selectData(index, item) {
				if (this.checkType == 'single') { //单选
					this.newCheckOptions.forEach(mess => {
						mess.selected = false
					})
					this.$set(item, 'selected', true)
				} else {
					//筛选点击前已选择的数据 判断还能不能选
					let chooseData = this.newCheckOptions.filter(mes => mes.selected)
					if (this.maxNum) {
						if (!item.selected && chooseData.length >= this.maxNum) {
							uni.showToast({
								title: '最多可选' + this.maxNum + '项',
								icon: 'none'
							})
							return
						}
					}
					this.$set(item, 'selected', item.selected ? false : true)
				}
				this.$forceUpdate()
				let chooseOnData = this.newCheckOptions.filter(mes => mes.selected)
				this.$emit("checkChange", chooseOnData)
			}
		}
	}
</script>

<style scoped>
	.zcks-card {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.craditem {
		padding: 8rpx 24rpx;
		margin-right: 24rpx;
		margin-bottom: 16rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		border: 2rpx solid #999999;
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
		text-align: left;
	}

	.active {
		animation: lighterBackgroundColor .001s 0.9 linear forwards;
		border: 2rpx solid var(--color);
		color: var(--color);
		position: relative;
	}
	
	@keyframes lighterBackgroundColor {
	  from {
	    background-color: var(--color)
	  }
	  to{
	    background-color: #fff
	  }
	}

	.active::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border-top: 42rpx solid var(--color);
		border-left: 42rpx solid transparent;
	}

	.active::before {
		width: 8rpx;
		height: 12rpx;
		border-color: #FFFFFF;
		border-style: solid;
		border-width: 0 1rpx 2rpx 0;
		content: "";
		position: absolute;
		right: 8rpx;
		top: 2rpx;
		z-index: 3;
		transform: rotate(45deg);
	}
</style>