const log = require('debug')('aggretsuko:commands:gearscore');

exports.sufix = "gearscore";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    let score = 0;

    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);
    
    if (args) {
        const parsed = parseInt(args[0]);
        if(!Number.isNaN(parsed) && Number.isInteger(parsed)) score = parsed;
        else message.channel.send(`You are not the smartedt person I know... use a number!`);
        // TODO save score to storage
    }

    log(`member:${message.author.username} executed command.`);
};