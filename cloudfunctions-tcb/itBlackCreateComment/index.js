'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const res = await db.collection('comment').add(event)
  return res
};
