const log = require('debug')('aggretsuko:storage:events');
const _ = require('lodash');

module.exports = (database) => {
    const internalDatabase = database;
    return {
        getAllEvents: () => {
            return new Promise((resolve, reject) => {
                internalDatabase.prepare('SELECT id, ownerId, messageId, message, created, eventTime FROM events WHERE closed is null;')
                .all((err, rows) => {
                    if(err) {
                        reject(err);
                    } 
                    if (rows === undefined) {
                        reject(new Error('No events found.'))
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        }
    };
};