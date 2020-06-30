'use strict';
exports.main = async (event, context) => {

  const db = uniCloud.database()
  const list = await db.collection('black-list')
    .orderBy('createTime', 'desc')
    .where({
      cityName: event.cityName
    })
    .skip((event.current - 1) * event.pageSize)
    .limit(event.pageSize)
    .get()
  //返回数据给客户端
  return list
};
