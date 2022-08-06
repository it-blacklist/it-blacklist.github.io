'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  const params = JSON.parse(body)
  if (params._id) {
    const list = await db.collection('black_list').doc(params._id).get()
    return list
  }
  const list = await db.collection('black_list')
    .orderBy('createTime', 'desc')
    .where({
      company: params.company ? new RegExp('.*'+params.company+ '.*', 'i') : undefined,
      city: params.city,
      checked: true
    })
    .skip((params.current - 1) * params.pageSize)
    .limit(params.pageSize)
    .get()
  return list
};
