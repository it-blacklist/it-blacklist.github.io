// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('blacklist')
    .orderBy('time', 'desc')
    .skip((event.current - 1) * event.pageSize)
    .limit(event.pageSize)
    .get()
  const total = await db.collection('blacklist')
    .count()
  return new Promise((resolve, reject) => {
    resolve({
      list: list.data,
      total: total.total
    })
  })
}