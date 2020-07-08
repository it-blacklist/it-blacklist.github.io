'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const count = await db.collection('black-list').count()
  //返回数据给客户端
  return count
};
