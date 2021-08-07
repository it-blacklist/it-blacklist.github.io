'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  const params = JSON.parse(body)
  const res = await db.collection('feedback').add(params)
  return res
};
