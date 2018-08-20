const _ = require('lodash');
const log = require('debug')('aggretsuko:bot');
const Discord = require('discord.js');
const config = require('./config');
const storage = require('./storage');

const commands = [];
const events = [];

commands.push(require('./commands/events.js'));
commands.push(require('./commands/ping.js'));
commands.push(require('./commands/uptime.js'));
commands.push(require('./commands/clearChannel.js'));

events.push(require('./events/manageEvents.js'));

const client = new Discord.Client();
let configuration;

client.on('ready', () => {
    log('discord client ready.');

    client.user.setStatus('available');

    client.user.setPresence({
        game: {
            name: 'Black Desert Online',
            type: 0
        }
    });

    _.map(_.concat(storage, events, commands), (item) => item.initialise(configuration, client));
});

client.on('message', (message) => {
    log(`message received id:${message.id} by member:${message.author.username}.`);
    if (!message.content.startsWith(configuration.discord.prefix) || message.author.bot) return;

    const isAdmin = message.member.roles.find((role) => role.name == configuration.discord.adminRole);
    const args = message.content.slice(configuration.discord.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const filter = { sufix: commandName };

    if (!message.guild.ownerID == message.author.id) {
        if (!isAdmin) filter.adminCommand = false;
    }

    _.map(_.filter(commands, filter), (command) => command.process(message, args, configuration.discord, client));
});

exports.start = () => config.load()
    .then(values => {
        configuration = values;

        client.login(configuration.discord.loginToken);
        log(`client logged in.`);
    });



//https://www.gitbook.com/book/anidiotsguide/discord-js-bot-guide



//https://discordapp.com/api/oauth2/authorize?client_id=477421707473190912&scope=bot&permissions=3669056