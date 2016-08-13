const express = require("express");
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createConnection(config.db);
const router = express.Router();

db.connect();

/* GET /prompt */

router.get("/", function(req, res, next) {
	res.set("Content-Type", "text/plain");
	const callSid = req.query.CallSid;
	const phoneNumber = req.query.CallFrom;
	
	db.query("Select A.stateId, B.promptAudioId from Sessions A INNER JOIN States B ON A.stateId = B.id Where phoneNumber = ? and validTill > ?",
		[phoneNumber, new Date()],
		(err, rows) => {
			if (err || !rows.length) {
				console.log("Error: Bad SessionID or Database not properly populated. Requesting promptAudioId for phoneNumber", phoneNumber);
				err && console.log(err, err.stack);
				res.status(400);
				res.end("Error occurred");
			} else {
				res.send(encodeURI("http://8cfd3fd2.ngrok.io/" + rows[0].promptAudioId));
			}
		});
});

module.exports = router;
