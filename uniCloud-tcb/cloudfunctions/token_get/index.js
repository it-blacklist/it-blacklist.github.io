'use strict';
const db = uniCloud.database()
exports.main = async () => {
	const res = await db.collection('system').doc('79550af260f83242286a017e23bd8ffc').get()
	const data = res.data[0]
	console.log(data)
	return data
};
