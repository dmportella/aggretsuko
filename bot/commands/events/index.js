const log = require('debug')('aggretsuko:commands:events');
const moment = require('moment');
const _ = require('lodash');

let _storage;

exports.sufix = "events";
exports.adminCommand = true;

function messageReactionAdd(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' added.`);
}

function messageReactionRemove(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' removed.`);
}

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);

    _storage = storage;
    
    client.on('messageReactionAdd', messageReactionAdd);
    client.on('messageReactionRemove', messageReactionRemove);
};

exports.process = (message, args, client) => {
    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);

    const subCommand = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';
    const value = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';

    switch (subCommand) {
        case 'list':
            listEvents(message, value);
            break;
        case 'create':
            createEvent(message, value);
            break;
        case 'delete':
            deleteEvent(message, value);
            break;
        case 'update':
            updateEvent(message, value);
            break;
    }
};

function getAllEventsFromStorage(message, score) {
    return _storage.eventsRepository.getAllEvents();
}

function listEvents(message, client) {
    getAllEventsFromStorage()
    .then((events) => {
        if(events && events.length > 0) {
            log(events);
            _.each(events, (event) => message.channel.send(`ID: ${event.id}, Owner: <@${event.ownerId}>, Message: ${event.message}, event time: ${event.eventTime}`));
        } else {
            message.channel.send('No events found.');
        }
    });
    
}

function createEvent(message, client) {

}

function deleteEvent(message, client) {

}

function updateEvent(message, client) {

}