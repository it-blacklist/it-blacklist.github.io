'use strict';
const db = uniCloud.database()
exports.main = async (event) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  body = JSON.parse(body)
  const config = await db.collection('system').doc('a81822d65f029fbe0054dd9d75817456').get()
  const {
    appid,
    secret,
  } = config.data[0]
  const res = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/sns/jscode2session?js_code=${body.code}&grant_type=authorization_code&appid=${appid}&secret=${secret}`)
  return res.data.toString('ascii')
};
