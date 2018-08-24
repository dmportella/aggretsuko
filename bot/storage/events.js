const log = require('debug')('aggretsuko:storage:gearscore');
const _ = require('lodash');

module.exports = (database) => {
    const internalDatabase = database;
    return {
        getAllEvents: () => {
            return new Promise((resolve, reject) => {
                internalDatabase.prepare('SELECT id, ownerId, messageId, message, created, eventTime FROM events;')
                .all((err, rows) => {
                    if(err) {
                        reject(err);
                    } 
                    
                    if (rows === undefined) {
                        reject(new Error('No score set.'))
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        }
    };
};