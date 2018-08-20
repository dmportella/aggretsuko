const log = require('debug')('aggretsuko:commands:events');

exports.sufix = "events";
exports.adminCommand = true;

exports.initialise = (configuration, client) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    message.channel.send(`this will let you manage, create and update events... :thinking:`);

    log(`member:${message.author.username} executed command.`);
    log(`${JSON.stringify(args)}`);
};

function listEvents(message, client) {

}

function createEvent(message, client) {
    
}

function deleteEvent(message, client) {

}

function updateEvent(message, client) {

}