const log = require('debug')('aggretsuko:commands:uptime');
const moment = require('moment');

exports.sufix = "uptime";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
    this.startup = new Date();
};

exports.process = (message, args, client) => {
    const difference = moment(new Date(),"DD/MM/YYYY HH:mm:ss").diff(moment(this.startup,"DD/MM/YYYY HH:mm:ss"), 'seconds');
    message.channel.send(`I have been up for: ${difference} seconds.`);

    log(`member:${message.author.username} executed command.`);
};