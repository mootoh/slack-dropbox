'use strict';

const https = require('https');

function fetch(callback, token, channel, oldest, latest) {
  var url = "https://slack.com/api/channels.history"
    + "?token=" + token
    + "&channel=" + channel
    + "&oldest=" + oldest
    + "&latest=" + latest;

    https.get(url, function(res) {
      var body = '';
      res.setEncoding('utf8');

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function(res) {
        callback(body);
      });
    }).on('error', function(e) {
      callback(null, e.message);
    });
}

const slack_history = {
  fetch: fetch
}

module.exports = slack_history
