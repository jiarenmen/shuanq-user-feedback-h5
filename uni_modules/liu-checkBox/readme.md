### liu-checkBox适用于uni-app项目的自定义复选框+单选框、数据选择器
### 本组件目前兼容微信小程序、H5
### 本组件是简单好用的单选复选框组件，支持主题控制、样式自定义、简单易修改
### 如使用过程中有问题或有一些好的建议，欢迎qq联系：2364518038

``` html
	<!-- 自定义单选： -->
	<liu-checkBox :checkType="checkType" :checkOptions="checkOptions" :activeColor="'#FF0000'" @checkChange="checkChange1"></liu-checkBox>
	<!-- 自定义多选(无最大可选限制)： -->
	<liu-checkBox :checkOptions="checkOptions2" :activeColor="'#20A474'" @checkChange="checkChange2"></liu-checkBox>
	<!-- 自定义多选(限制最大可选)： -->
	<liu-checkBox :checkOptions="checkOptions3" :maxNum="maxNum" @checkChange="checkChange3"></liu-checkBox>
```
``` javascript
export default {
	data() {
		return {
			checkType: 'single',//选择类型 单选 single 多选 multiple
			maxNum: 5, //复选最大可选数量
			checkOptions: [{
				id: 1,
				name: '选项1'
			},{
				id: 2,
				name: '选项2'
			},{
				id: 3,
				name: '选项3'
			}],
			checkOptions2: [{
				id: 4,
				name: '选项4'
			},{
				id: 5,
				name: '选项5'
			},{
				id: 6,
				name: '选项6'
			},{
				id: 7,
				name: '选项7'
			},{
				id: 8,
				name: '选项8'
			}],
			checkOptions3: [{
				id: 9,
				name: '选项9'
			},{
				id: 10,
				name: '选项10'
			},{
				id: 11,
				name: '选项11'
			},{
				id: 12,
				name: '选项12'
			},{
				id: 13,
				name: '选项13'
			},{
				id: 14,
				name: '选项14'
			},{
				id: 15,
				name: '选项15'
			},{
				id: 16,
				name: '选项16'
			},{
				id: 17,
				name: '选项17'
			}]
		};
	},
	methods: {
		//选中状态发生变化时触发 data为选中对所有对象数据
		checkChange1(data){
			// 点击选中的所有item 数组 执行业务逻辑 
			// console.log(data)
		},
		//选中状态发生变化触发 data为选中对所有对象数据
		checkChange2(data){
			// 点击选中的所有item 数组 执行业务逻辑 
			// console.log(data)
		},
		//选中状态发生变化触发 data为选中对所有对象数据
		checkChange3(data){
			// 点击选中的所有item 数组 执行业务逻辑 
			// console.log(data)
		}
	}
}
```

### 属性说明
| 名称                         | 类型            | 默认值               			| 描述            |
| ----------------------------|--------------- | -------------------------| ---------------|
| checkOptions             		| Array          | []             					| 选项数据
| checkType                 	| String         | ''				 								| 选择类型  单选时需传参 'single' 默认为空即默认多选
| maxNum                 			| String         | 						 							| 复选时最大可选数量 默认为空即不限制最大可选数量 类型为单选的时候不生效
| activeColor                 | String         | '#0A4B9D'   							| 选中主题颜色