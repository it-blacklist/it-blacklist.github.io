'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('black-list')
    .where({
      companyName: db.RegExp({
        regexp: event.companyName,
        options: 'i'
      })
    })
    .get()
  //返回数据给客户端
  return list
};
