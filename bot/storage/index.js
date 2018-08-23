const log = require('debug')('aggretsuko:storage');
const fs = require('fs');

const sqlite3 = require('sqlite3');
let database;

exports.initialise = (configuration) => {
    return new Promise((resolve, reject) => {
        log('initialising database.')
        database = new sqlite3.Database(configuration.database, (err) => {
            if (err) {
                log(err.message);
                reject(err);
            }
            log('setting up tables.')
            const file = fs.readFileSync('database.db.sql', 'utf8');
            database.exec(file, (err) => {
                if(err) reject(err.message);
                else resolve();
            });
        });
    })
    .then(() => {
        log(`Setting up repositories.`);
        const gear = require('./gear')(database);
        
        exports.gearScoreRepository = gear;
    });
};


// https://codeforgeek.com/2014/07/node-sqlite-tutorial/
/*
//https://stackoverflow.com/questions/44448029/how-to-use-google-sheets-api-while-inside-a-google-cloud-function/51037780#51037780

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the @@ database.');
});

db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                  Name as name
           FROM playlists`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row.id + "\t" + row.name);
        });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
*/