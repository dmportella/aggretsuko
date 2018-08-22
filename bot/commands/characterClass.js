const log = require('debug')('aggretsuko:commands:class');

exports.sufix = "class";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    let score = 0;

    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);
    
    if (args) {
        message.channel.send(`You are not the smartest person I know... use a number!`);
        // TODO save score to storage
    }

    log(`member:${message.author.username} executed command.`);
};