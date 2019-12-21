// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const content_result = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    if (content_result.errCode === 0) {
      const res = await db.collection('blacklist_rate').add({ data:event })
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    }
  } catch (e) {
    return new Promise((resolve, reject) => {
      resolve(e)
    })
    throw e
  }
}