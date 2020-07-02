'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('system')
    .get()
  //返回数据给客户端
  return list
};
