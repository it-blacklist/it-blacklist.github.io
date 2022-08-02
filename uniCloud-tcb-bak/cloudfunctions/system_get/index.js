'use strict';
const db = uniCloud.database()
exports.main = async () => {
  const list = await db.collection('system')
    .doc('79550af260f83242286a017e23bd8ffc')
    .get()
  //返回数据给客户端
  return list
};
