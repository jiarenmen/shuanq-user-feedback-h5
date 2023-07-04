import request from './request'
export function getFeedbackConfig(data) {
    return request.get('/index/app/get_app_feedback_config',data)
}
export function getFeedbackClassifyList(data) {
    return request.get('/index/app/get_feedback_classify_list',data)
}
export function getFeedbackDataList(data) {
    return request.get('/index/app/get_feedback_data_list',data)
}
export function getFeedbackDataInfo(data) {
    return request.get('/index/app/get_feedback_data_info',data)
}
export function pushFeedbackInfo(data) {
    return request.post('/index/app/push_feedback_info',data)
}
export async function fileUpdate(file) {
    return new Promise(async (resolve,reject)=> {
        await uni.uploadFile({
            url: request.baseUrl+ '/index/app/feedback_file_update', //上传的路径
            filePath:file.url,
			cloudPath:file.name,
            name: 'file',
			formData:{
				appid:window.config.appid
			},
            success: async (res) => {
                const data = JSON.parse(res.data)
				console.log("上传结果",data)
                if (data.code === 1) {
                    resolve(data.data.file_id)
                } else {
                    reject(data.msg)
                }
            },
            fail: ({errMsg}) => {
                reject(errMsg)
            }
        });
    })
}
export default {
    getFeedbackConfig,getFeedbackClassifyList,getFeedbackDataList,getFeedbackDataInfo,pushFeedbackInfo,fileUpdate
}
