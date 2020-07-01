'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const res = await db.collection('black-list').add(event)
  return res
};
