'use strict';

const fs = require('fs')
  , request = require('request')
  ;

function upload(access_token, path, content, callback) {
  let apiArg = {
    "path": path,
    "mode": "add",
    "autorename": true,
    "mute": false
  };

  request.post({
    'url': 'https://content.dropboxapi.com/2/files/upload',
    'headers': {
      'Authorization': 'Bearer ' + access_token,
      'Dropbox-API-Arg': JSON.stringify(apiArg),
      'Content-Type': 'application/octet-stream'
    },
    'body': content
  }, function(error, response, body) {
    callback(error, response, body);
  });
}

const dropbox_upload = {
  upload: upload
}

module.exports = dropbox_upload
