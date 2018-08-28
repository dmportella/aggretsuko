const log = require('debug')('aggretsuko:commands:gearscore');
const _ = require('lodash');
const Discord = require('discord.js');

const defaultColourHex = 0x33ff00;
let _storage;

function setGearScoreFromStorage(message, score) {
    return _storage.gearScoreRepository.setGearScore(message.author.id, score);
}

function getGearScoreFromStorage(message) {
    return _storage.gearScoreRepository.getGearScore(message.author.id);
}

function fetchScore(message, input) {
    if (input) {
        const parsed = parseInt(input);
        if (Number.isNaN(parsed) && !Number.isInteger(parsed)) {
            return Promise.reject(new Error(`<@${message.author.id}>, you are not the smartest person I know... use a number!`));

        }
        return setGearScoreFromStorage(message, parsed).then(() => getGearScoreFromStorage(message));
    }
    return getGearScoreFromStorage(message);
}

function getAllScoresFromStorage(message) {
    return _storage.gearScoreRepository.getAllScores();
}

function getAverage(scores) {
    return _.reduce(scores, (total, score) => total + score) / scores.length;
}

function getStandardDeviantion(scores, average) {
    const squaredDeviations = _.reduce(scores, (total, score) => {
        const deviation = score - average;
        const deviationSquared = deviation * deviation;

        return total + deviationSquared;
    }, 0);

    return Math.sqrt(squaredDeviations / scores.length);
}

function fetchInfo(message) {
    return getAllScoresFromStorage()
        .then((scores) => {
            const average = getAverage(scores);
            const deviation = getStandardDeviantion(scores, average);

            return new Discord.RichEmbed()
                .setDescription("Contains information about the gear score of the guild like averages, standard deviations and more.")
                .setTimestamp(new Date())
                .setColor(defaultColourHex)
                .setTitle("Gear score Information")
                .addField("Average (all)", `${average}`)
                .addField("Standard Deviation (all)", `${deviation}`)
                .setFooter("More info coming soon... :thinking:");
        });
}

function getHelpMessage() {
    return Promise.resolve(
        new Discord.RichEmbed()
                .setColor(defaultColourHex)
                .setTitle("Gear score help")
                .addField("Set your gear score", `gearscore set 123`)
                .addField("Show guild gearscore info", `gearscore info`)
                .setFooter("More info coming soon... :thinking:")
    );
}

exports.sufix = "gearscore";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
    _storage = storage;
};

exports.process = (message, args, client) => {
    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);

    const subCommand = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';
    const value = args !== undefined && args.length > 0 ? args.shift().toLowerCase() : '';

    switch (subCommand) {
        case '':
        case 'set':
            fetchScore(message, value)
                .then(score => message.channel.send(`<@${message.author.id}>, your gear score is: ${score}.`))
                .catch(err => message.channel.send(err.message));
            break;
        case 'info':
            fetchInfo(message)
            .then((response) => message.channel.send(response))
            .catch((err) => message.channel.send(`error: ${err.message}`));
            break;
        case 'help':
        default:
            getHelpMessage()
            .then((helpMsg) => message.channel.send(helpMsg));
            break;
    }
};