'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const config = await db.collection('system').doc('a81822d65f029fbe0054dd9d75817456').get()
  const {
    accessTokenUrl,
    grant_type,
    appid,
    secret,
    msgSecCheckUrl
  } = config.data[0]
  const res = await uniCloud.httpclient.request(
    `${accessTokenUrl}?grant_type=${grant_type}&appid=${appid}&secret=${secret}`)
  console.log(JSON.parse(res.data.toString('ascii')).access_token)
  const access_token = JSON.parse(res.data.toString('ascii')).access_token
  const r = await uniCloud.httpclient.request(`${msgSecCheckUrl}?access_token=${access_token}`, {
    method: 'POST',
    data: JSON.stringify({
      content: JSON.stringify(event)
    })
  })
  return JSON.parse(r.data.toString('ascii'))
}
