'use strict';
const db = uniCloud.database()
exports.main = async () => {
  const count = await db.collection('black_list').count()
  //返回数据给客户端
  return {
    data: count
  }
};
