'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const dbCmd = db.command
	let res = await collection.where({
		city: dbCmd.eq('石家庄')
	}).update({
		rate: [],
		userInfo: {}
	})
	return res
};
