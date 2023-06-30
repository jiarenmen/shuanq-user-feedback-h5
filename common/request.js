const baseUrl=location.hostname==="localhost"?'http://yanzheng.giao.cc':'';
const common={
	header: {},
	data: {

	},
	dataType: 'json',
}
function request(options = {}) {
	const header= {
		'content-type': 'application/json',//'application/x-www-form-urlencoded'
		// 'user-token':UserToken.token || '',
		// 'user-id':UserToken.id || '',
	}
	options.header=Object.assign(header,options.header)
	options.url = baseUrl + options.url
	options.header = options.header || common.header
	//options.data = options.data || common.data

	let paramData=Object.assign(options.data,common.data)
	options.data=paramData

	options.method = options.method || common.method
	options.dataType = options.dataType || common.dataType
	return new Promise((resolve,reject)=>{
		uni.request({
			...options,
			success: (res)=>{
				resolve(res)
			},
			fail: (err)=>{
				reject(err)
			}
		})
	})
}

// get请求
export function get(url, data = {}) {
	const options={}
	options.url = url
	options.data = data
	options.method = 'GET'
	return request(options)
}
// post请求
export function post(url, data = {}) {
	const options={}
	options.url = url
	options.data = data
	options.method = 'POST'
	return request(options)
}

let service = {
	baseUrl,
    post,
    get
}

export default service
