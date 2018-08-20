const log = require('debug')('aggretsuko:commands:ping');

exports.sufix = "ping";
exports.adminCommand = false;

exports.initialise = (configuration, client) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    message.channel.send("pong!");

    log(`member:${message.author.username} executed command.`);
};