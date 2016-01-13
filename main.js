'use strict';

const dropboxUpload = require('./lib/dropbox_upload');
const slackHistory = require('./lib/slack_history')
const path = require('path');
const moment = require('moment');

const dropbox_access_token = process.env.DROPBOX_ACCESS_TOKEN;
const dropbox_folder = process.env.DROPBOX_FOLDER;
const slack_token = process.env.SLACK_TOKEN;
const slack_channel = process.env.SLACK_CHANNEL;

// Fetch Slack history for yesterday
const oldest = moment().add(-1, 'days').startOf('day').unix();
const latest = moment().add(-1, 'days').endOf('day').unix();

slackHistory.fetch(function(body, error) {
  if (error) {
    console.log(error);
    return -1;
  }

  const now = new Date();
  const today = [now.getFullYear(), ('0' + (now.getMonth() + 1)).slice(-2), ('0' + (now.getDate())).slice(-2)].join('-');
  const path = '/' + dropbox_folder + '/' + today + '-slack.json'

  dropboxUpload.upload(dropbox_access_token, path, body, function(error2, response, body) {
    if (error2) {
      console.log(error2);
      return -1;
    }
    console.log(response);
  });
}, slack_token, slack_channel, oldest, latest);
