"use strict";

require('es6-promise').polyfill();
var googleTTS =  require('google-tts-api');
var request = require('request');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var urlParse  = require('url').parse;

function downloadFile (url, dest) {
  return new Promise(function (resolve, reject) {
    var info = urlParse(url);
    var httpClient = info.protocol === 'https:' ? https : http;
    var options = {
      host: info.host,
      path: info.path,
      headers: {
        'user-agent': 'WHAT_EVER'
      }
    };

    httpClient.get(options, function(res) {
      if (res.statusCode !== 200) {
        reject(new Error('request to ' + url + ' failed, status code = ' + res.statusCode + ' (' + res.statusMessage + ')'));
        return;
      }

      var file = fs.createWriteStream(dest);
      file.on('finish', function() {
        file.close(resolve);
      });
      file.on('error', function (err) {
        fs.unlink(dest);
        reject(err);
      });

      res.pipe(file);
    })
    .on('error', function(err) {
      reject(err);
    })
    .end();
  });
}


request('https://www.googleapis.com/language/translate/v2?key=AIzaSyCpJcFrHTK5IB7cv_rnByRlnic3G5-VIWU&q=what%20is%20your%20name%20?&source=en&target=hi', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body).data.translations[0].translatedText)
	
    googleTTS( JSON.parse(body).data.translations[0].translatedText , 'hi' , 1)
	.then(function (url) {
	console.log(url);

  	var dest = path.resolve(__dirname, 'hello.mp3'); // file destination
	console.log('Download to ' + dest + ' ...');

  	return downloadFile(url, dest);	
	})
	
	.then(function () {
	 console.log('Download success');
	})
	
	.catch(function (err) {
  	console.error(err.stack);	
	});	
	}
  else
    console.log(response.statusCode);
})


