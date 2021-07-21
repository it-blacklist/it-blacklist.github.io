'use strict';
const db = uniCloud.database()
exports.main = async () => {
	const config = await db.collection('system').doc('a81822d65f029fbe0054dd9d75817456').get()
	const {
	  accessTokenUrl,
	  grant_type,
	  appid,
	  secret,
	} = config.data[0]
	const res = await uniCloud.httpclient.request(
	  `${accessTokenUrl}?grant_type=${grant_type}&appid=${appid}&secret=${secret}`)
	const access_token = JSON.parse(res.data.toString('ascii')).access_token
	const res2 = await db.collection('system').doc('79550af260f83242286a017e23bd8ffc').update({ access_token })
	console.log(access_token)
	return res2
};
