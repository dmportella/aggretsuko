const log = require('debug')('aggretsuko:commands:ping');
const Discord = require('discord.js');

exports.sufix = "ping";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    message.channel.send('ping');

    log(`member:${message.author.username} executed command.`);
};