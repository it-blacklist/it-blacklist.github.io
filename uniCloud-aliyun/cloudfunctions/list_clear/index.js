'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const dbCmd = db.command
	let res = await db.collection('black_list').where({
		checked: dbCmd.eq(true)
	}).update({
		userInfo: dbCmd.remove()
	})
	return res
};
