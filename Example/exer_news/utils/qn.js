const qiniu_sdk = require('qiniu')
// const { qiniu } = require('../../../config/')
qiniu_sdk.conf.ACCESS_KEY = 'q3mcaHZe6V4vG5XtAUBP1368VVrDLcdlJIRpDhS5';
qiniu_sdk.conf.SECRET_KEY = 'KfecHwFTh9jOXHNqdszh5a2vw_3iDjvSAS6zUPs1';
 
// 要上传的空间
const bucket = "inews01"
 
// 文件前缀
const prefix = 'image/avatar/'
 
// 生成上传文件的 token
const token = (bucket, key) => {
    
    const policy = new qiniu_sdk.rs.PutPolicy({ isPrefixalScope: 1, scope: bucket + ':' + key })
 
 
    return policy.uploadToken()
}
 
const config = new qiniu_sdk.conf.Config()
 
async function upload_file(file_name, file_path){
    // 保存到七牛的地址
    const file_save_path = prefix + file_name
 
    // 七牛上传的token
    const up_token = token(bucket, file_save_path)
 
    const extra = new qiniu_sdk.form_up.PutExtra()
 
    const formUploader = new qiniu_sdk.form_up.FormUploader(config)
 
    // 上传文件
    let ret = await new Promise((resolve, reject)=>{

        formUploader.putFile(up_token, file_save_path, file_path, extra, (err, data) => {
            if (!err) {
                // 上传成功， 处理返回值
                resolve(data);
            } else {
                // 上传失败， 处理返回代码
                reject(data);
            }
        });    
    }) 
    return ret
}

// upload_file(上传后的名字，上传的图片路径)   //上传的图片相对路径, 从项目文件夹出发
// upload_file('01.jpg', './01.jpg')  

module.exports = upload_file