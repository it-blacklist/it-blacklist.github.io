'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const list = await db.collection('black-list')
    .orderBy('createTime', 'desc')
    .where({
      cityName: event.cityName,
      checked: true
    })
    .skip((event.current - 1) * event.pageSize)
    .limit(event.pageSize)
    .get()
  //返回数据给客户端
  return list
};
