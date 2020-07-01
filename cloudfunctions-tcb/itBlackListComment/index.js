'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('comment')
    .where({ companyName: event.companyName})
    .get()
  //返回数据给客户端
  return list
};
