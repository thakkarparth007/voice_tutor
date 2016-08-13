const express = require("express");
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createConnection(config.db);
const router = express.Router();

db.connect();

/* GET /response */

router.get("/", function(req, res, next) {
	res.set("Content-Type", "text/plain");
	const callSid = req.query.CallSid;
	const phoneNumber = req.query.CallFrom;
	
	console.log(res.query);
	res.send("K bye :)");
});

/* POST /response */

router.get("/ivr/:choice", function(req, res, next) {
	res.set("Content-Type", "text/plain");
	const callSid = req.query.CallSid;
	const phoneNumber = req.query.CallFrom;
	const choice = req.params.choice;

	db.query("Select output, input, nextStateId from States where id = (Select stateId from Sessions where phoneNumber = ?)",
		[phoneNumber],
		(err, rows) => {
			if (err || rows.length == 0) {
				console.log("No match found: choice=%s for phoneNumber=%s", choice, phoneNumber);
				err && console.log(err, err.stack);
				res.status(500);
				res.end("Error occurred!");
			}
			else if (rows[0].input != "*" && rows[0].input != choice) {
				console.log("Invalid input: choice=%s for phoneNumber=%s", choice, phoneNumber);
				res.status(400);
				res.end("Invalid input");
			}
			else {
				req._nextStateId_ = rows[0].nextStateId;
				req._output_ = rows[0].output;
				next();
			}
		});
});

router.get("/ivr/:choice", function(req, res, next) {
	const callSid = req.query.CallSid;
	const phoneNumber = req.query.CallFrom;
	const choice = req.query.choice;

	db.query("UPDATE Sessions set stateId = ?",
		[req._nextStateId_],
		(err, result) => {
			if (err) {
				console.log(err, err.stack);
				res.status(500);
				res.end("Error occurred!");
			}
			else {
				res.end("{\"select\": \"" + req._output_ + "\"}");
			}
		});
});


module.exports = router;
