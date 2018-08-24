const log = require('debug')('aggretsuko:storage:gearscore');
const _ = require('lodash');

module.exports = (database) => {
    const internalDatabase = database;
    return {
        getAllScores: () => {
            return new Promise((resolve, reject) => {
                internalDatabase.prepare('SELECT score FROM gearScores;')
                .all((err, rows) => {
                    if(err) {
                        reject(err);
                    } 
                    
                    if (rows === undefined) {
                        reject(new Error('No score set.'))
                    }
                    else {
                        const flattenArray = _.flatMap(rows, (row) => row.score);
                        resolve(flattenArray);
                    }
                });
            });
        },
        getGearScore: (discordId) => {
            return new Promise((resolve, reject) => {
                internalDatabase.prepare('SELECT score FROM gearScores WHERE discordId = ?;')
                .get(discordId, (err, row) => {
                    if(err) {
                        reject(err);
                    } 
                    
                    if (row === undefined) {
                        reject(new Error('No score set.'))
                    }
                    else {
                        resolve(row.score);
                    }
                });
            });
        },
        setGearScore: (discordId, score) => {
            return new Promise((resolve, reject) => {
                internalDatabase.prepare('INSERT OR REPLACE INTO gearScores (discordId, score) values(?, ?);')
                .run([discordId, score], (err) => {
                    if(err) reject(err);
                    else resolve();
                });                
            });
        }
    };
};