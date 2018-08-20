const { google } = require('googleapis');
const uuid = require('uuid');

function getJwt() {
  var credentials = require("./credentials.json");
  return new google.auth.JWT(
    credentials.client_email, null, credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
}

function getApiKey() {
  var apiKeyFile = require("./api-key.json");
  return apiKeyFile.key;
}

const jwt = getJwt();
const apiKey = getApiKey();
const spreadsheetId = '';

exports.addSignUp = (event_id, discordId) => {
  const range = 'attendance!A1';

  var row = [new Date(), event_id, discordId, 1, 0];

  appendSheetRow(jwt, apiKey, spreadsheetId, range, row);
}

exports.addEvent = (eventName, eventTime) => {
  const range = 'events!A1';

  var row = [uuid.v1(), new Date(), eventName, eventTime];

  appendSheetRow(jwt, apiKey, spreadsheetId, range, row);
}

exports.addPlayer = (playerName, playerClass, discordId, gearScore) => {
  const range = 'players!A1';

  var row = [discordId, playerName, playerClass, gearScore, new Date()];

  appendSheetRow(jwt, apiKey, spreadsheetId, range, row);
}

function addSheet(jwt, apiKey, spreadsheetId, name) {
  let requests = [];

  requests.push({addSheet:{properties:{title: 'FOO' }}});

  const sheets = google.sheets({ version: 'v4' });
  sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    auth: jwt,
    key: apiKey,
    resource: {requests},
  }, (err, response) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log('all done');
    }
  });
}

function appendSheetRow(jwt, apiKey, spreadsheetId, range, row) {
  const sheets = google.sheets({ version: 'v4' });
  sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: range,
    auth: jwt,
    key: apiKey,
    valueInputOption: 'RAW',
    resource: { values: [row] }
  }, function (err, result) {
    if (err) {
      throw err;
    }
    else {
      console.log('Updated sheet: ' + result.data.updates.updatedRange);
    }
  });
}