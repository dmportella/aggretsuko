const { inspect } = require('util');
const log = require('debug')('aggretsuko:events:manageEvents');

function messageReactionAdd(reaction, user) {
    log(`reaction name:${reaction.emoji.name} added.`);
}

function messageReactionRemove(reaction, user) {
    log(`reaction name:${reaction.emoji.name} removed.`);
}

exports.initialise = (configuration, client) => {
    log(`event initialised.`);
    
    client.on('messageReactionAdd', messageReactionAdd);
    client.on('messageReactionRemove', messageReactionRemove);
};