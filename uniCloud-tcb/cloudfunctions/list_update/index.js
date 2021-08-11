'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  //更新点赞数据
  const params = JSON.parse(body)
  if (params._id && params.rate) {
    const count = await db.collection('black_list').where({
      _id: params._id,
      'rate.userInfo.openid': params.rate.userInfo.openid
    }).count()
    if (count.total) {
      const res = await db.collection('black_list').where({
        _id: params._id,
        'rate.userInfo.openid': params.rate.userInfo.openid
      }).update({
        'rate.$': params.rate
      })
      return res
    }
    const res = await db.collection('black_list').where({
      _id: params._id,
      //'rate.userInfo.nickName': params.rate.userInfo.nickName
    }).update({
      'rate': db.command.push(params.rate)
    })
    return res
  }
  //安全验证
  const list = await db.collection('system').doc('79550af260f83242286a017e23bd8ffc').get()
  const access_token = list.data[0].access_token
  console.log(body.toString('ascii'))
  const r = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`, {
      method: 'POST',
      data: JSON.stringify({
        content: body.toString('ascii')
      })
    })
  const success = JSON.parse(r.data.toString('ascii'))

  if (success.errcode !== 0) {
    return success
  } else {
    //const params = JSON.parse(body)
    const res = await db.collection('black_list').add({
      ...params,
      createTime: new Date().getTime(),
      checked: true
    })
    console.log(res)
    return res
  }
};
