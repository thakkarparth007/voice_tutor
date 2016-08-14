'use strict';
var google = require('googleapis');
var async = require('async');
var fs = require('fs');
var speech = google.speech('v1beta1').speech;
var request = require('request');
function getAuthClient (callback) {
  google.auth.getApplicationDefault(function (err, authClient) {
    if (err) {
      return callback(err);
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
        authClient = authClient.createScoped([
        'https://www.googleapis.com/auth/cloud-platform'
      ]);
    }

    return callback(null, authClient);
  });
}
function prepareRequest (inputFile, callback) {
  fs.readFile(inputFile, function (err, audioFile) {
    if (err) {
      return callback(err);
    }
    console.log('Got audio file!');
    var encoded = new Buffer(audioFile).toString('base64');
    var payload = {
      config: {
        encoding: 'FLAC',
        sampleRate: 24000 ,
        language_code : 'hi'
      },
      audio: {
        content: encoded
      }
    };
    return callback(null, payload);
  });
}
function main (inputFile, callback) {
  var requestPayload;

  async.waterfall([
    function (cb) {
      prepareRequest(inputFile, cb);
    },
    function (payload, cb) {
      requestPayload = payload;
      getAuthClient(cb);
    },
    function sendRequest (authClient, cb) {
      console.log('Analyzing speech...');
      speech.syncrecognize({
        auth: authClient,
        resource: requestPayload
      }, function (err, result) {
        if (err) {
          return cb(err);
        }
        console.log('result:', JSON.stringify(result, null, 2));
        request('https://www.googleapis.com/language/translate/v2?key=AIzaSyCpJcFrHTK5IB7cv_rnByRlnic3G5-VIWU&q=' + encodeURI(result.results[0].alternatives[0].transcript) + '&source=hi&target=en', function (error, response, body) {
            if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).data.translations[0].translatedText)
          }
        });
        cb(null, result);
      });
    }
    // 
  ], callback);
}



if (module === require.main) {
  if (process.argv.length < 3) {
    console.log('Usage: node recognize <inputFile>');
    process.exit();
  }
  var inputFile = process.argv[2];
  main(inputFile, console.log);
}
exports.main = main;
