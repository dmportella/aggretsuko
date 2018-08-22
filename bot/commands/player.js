const log = require('debug')('aggretsuko:commands:player');

exports.sufix = "player";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    message.channel.send("pong!");

    log(`member:${message.author.username} executed command.`);
};