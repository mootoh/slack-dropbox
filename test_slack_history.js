'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const slackHistory = require('./lib/slack_history')

// test
function readConfig() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')));
}

var config = readConfig();
const token = config.slack_token;
const channel = config.slack_channel;

const oldest = moment().startOf('day').unix();
const latest = moment().endOf('day').unix();

slackHistory.fetch(function(body, error) {
  if (error) {
    console.log(error);
    return;
  }

  let ret = JSON.parse(body);

  console.log(body);
}, token, channel, oldest, latest);
