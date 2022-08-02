'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  const params = JSON.parse(body)
  const list = await db.collection('discuss')
    .orderBy('createTime', 'desc')
    .where({
      company: db.RegExp({
        regexp: params.company,
        options: 'i'
      }),
      checked: true
    })
    .skip((params.current - 1) * params.pageSize)
    .limit(params.pageSize)
    .get()
  return list
};
