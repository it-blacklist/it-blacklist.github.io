'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('black-list').doc(event._id).get()
  //返回数据给客户端
  return list
};
