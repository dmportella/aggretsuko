const log = require('debug')('aggretsuko:commands:events');
const moment = require('moment');
const _ = require('lodash');
const { inspect } = require('util');
const Discord = require('discord.js');

const defaultColourHex = 0x33ff00;
let _storage;

exports.sufix = "events";
exports.adminCommand = true;

function messageReactionAdd(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' added.`);
    //todo
    if (!reaction.message.author.bot) return;
    if (reaction.emoji.name === "❤") {
        getEventMessage(reaction.users)
            .then((msg) => reaction.message.edit(msg));
    }
}
function messageReactionRemove(reaction, user) {
    log(`reaction name:${reaction.emoji.name} with id '${reaction.emoji.id}' removed.`);
}

function getEventMessage(users) {
    return new Promise((resolve) => {
        const names = [];
        users.map((user) => {
            names.push(user.username)
        });

        return resolve(new Discord.RichEmbed()
            .setDescription("Sea hunting")
            .setTimestamp(new Date())
            .setColor(defaultColourHex)
            .setTitle("Event")
            .addField(`Attending`, names.join('\n')));
    });
}

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);

    _storage = storage;

    //todo
    const mainChannel = client.channels.get('');

    mainChannel.fetchMessages().then((messages) => log('loaded channel messages'));

    client.on('messageReactionAdd', messageReactionAdd);
    client.on('messageReactionRemove', messageReactionRemove);
};

exports.process = (message, args, client) => {
    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);

    const subCommand = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';
    const value = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';

    switch (subCommand) {
        case 'list':
            listEvents(message, client, value, args);
            break;
        case 'create':
            createEvent(message, client, value, args);
            break;
        case 'delete':
            deleteEvent(message, client, value, args);
            break;
        case 'update':
            updateEvent(message, client, value, args);
            break;
    }
};

function getAllEventsFromStorage(message, score) {
    return _storage.eventsRepository.getAllEvents();
}

function listEvents(message, client, value, args) {
    getAllEventsFromStorage()
        .then((events) => {
            if (events && events.length > 0) {
                let msg = new Discord.RichEmbed()
                    .setDescription("List of active events.")
                    .setTimestamp(new Date())
                    .setColor(defaultColourHex)
                    .setTitle("Active Events")
                    .setFooter("More info coming soon... :thinking:");
                _.each(events, (event) => {
                    msg = msg.addField(`#${event.id} - ${event.message}`, `on ${event.eventTime}`)
                });
                return Promise.resolve(msg);
            } else {
                return Promise.reject("No events available.")
            }
        })
        .then((response) => message.channel.send(response))
        .catch((err) => message.channel.send(`error: ${err.message}`));
}

function createEvent(message, client, value, args) {

}

function deleteEvent(message, client, value, args) {

}

function updateEvent(message, client, value, args) {

}