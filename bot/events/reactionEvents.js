const { inspect } = require('util');
const log = require('debug')('aggretsuko:events:manageEvents');

function messageReactionAdd(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' added.`);
}

function messageReactionRemove(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' removed.`);
}

exports.initialise = (client, storage, configuration) => {
    log(`event initialised.`);
    
    client.on('messageReactionAdd', messageReactionAdd);
    client.on('messageReactionRemove', messageReactionRemove);
};

/*https://github.com/discordjs/discord.js/blob/c62f01f0e4e3c24c3227b10704ac3ccf8744a6e1/src/util/Constants.js*/