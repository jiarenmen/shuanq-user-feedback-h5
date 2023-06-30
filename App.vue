<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page
	{
	    //让文本可以选中
	    -webkit-user-select: text;
	
	    max-width: 1888rpx;  //最大宽度自己可以调整(适应pc宽屏)
	    margin: auto !important;
	}
	/*每个页面公共css */
</style>
