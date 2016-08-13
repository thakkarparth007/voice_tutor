const express = require("express");
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createConnection(config.db);
const router = express.Router();

db.connect();

/* GET / */
router.get("/", function(req, res, next) {
	res.set("Content-Type", "text/plain");
	const callSid = req.query.CallSid;
	const phoneNumber = req.query.CallFrom;
	const stateId = "start";
	const validTill = new Date();
	validTill.setMinutes(validTill.getMinutes() + 10);

	db.query("INSERT INTO Sessions values(?, ?, ?, ?)",
		[phoneNumber, callSid, stateId, validTill],
		(err, result) => {
			if (err) {
				console.log(err);
				res.status(500);
				res.end("Error occurred");
			} else {
				res.send("");
			}
		});

});

module.exports = router;
