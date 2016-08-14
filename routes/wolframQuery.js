"use strict";
const wolfram = require("wolfram-alpha").createClient("EYGLQW-L76J7UA72A");

module.exports = (query, callback) => {
	wolfram.query(query, function (err, result) {
		if (err) {
			callback(err);
		}

		for (const pod of result) {
			if (pod.primary === true && pod.subpods[0].text) {
				let answer = "";
				const rawAnswer = pod.subpods[0].text;

				if (rawAnswer[0] !== "1") {
					answer = rawAnswer.replace(/([^|]+)[|] /, "");
				} else {
					answer = rawAnswer.replace(/\n.*/g, "").replace(/1 [|]([^|]+)[|] /, "")
				}

				callback(null, answer)
			}
		}
	});
}