'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const check = await uniCloud.callFunction({
    name: 'msgSecCheck',
    data: event
  })
  if (check.result.errcode !== 0) {
    return false
  } else {
    const res = await db.collection('comment').add({ ...event,
      createTime: new Date().getTime(),
      checked: true
    })
    return res
  }
};
