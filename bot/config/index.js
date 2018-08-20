const fs = require('fs');
const log = require('debug')('aggretsuko:config');

exports.load = () => {
    return new Promise((resolve, reject) => fs.readFile(`./config.json`, 'utf-8', (err, data) => {
        if (err) {
            log('Error reading config.');
            reject(err);
        } else {
            log('Config file found loading variables.');
            resolve(JSON.parse(data));
        }
    }));
}