'use strict';

const dropboxUpload = require('./lib/dropbox_upload');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./config.json'));
const access_token = config.dropbox_access_token;
const folder = config.dropbox_folder;

const now = new Date();
const today = [now.getFullYear(), ('0' + (now.getMonth() + 1)).slice(-2), ('0' + (now.getDate())).slice(-2)].join('-');

const path = '/' + folder + '/' + today + '/slack.log'
const content = fs.readFileSync('./package.json');

dropboxUpload.upload(access_token, path, content, function(error, response, body) {
  console.log(error);
  console.log(response);
});
