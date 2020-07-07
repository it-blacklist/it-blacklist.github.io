'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('system')
    .doc('694cb712-ce24-4e26-9409-a980ecb04fac')
    .get()
  //返回数据给客户端
  return list
};
