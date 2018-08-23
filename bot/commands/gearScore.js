const log = require('debug')('aggretsuko:commands:gearscore');

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
        if(Number.isNaN(parsed) && !Number.isInteger(parsed)) 
        { 
            return Promise.reject(new Error(`You are not the smartest person I know... use a number!`));
            
        }
        return setGearScoreFromStorage(message, parsed).then(() => getGearScoreFromStorage(message));
    }
    return getGearScoreFromStorage(message);
}

exports.sufix = "gearscore";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
    _storage = storage;
};

exports.process = (message, args, client) => {
    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);
    
    fetchScore(message, args && args.lenght !== 0 ? args[0] : null)
    .then(score => message.channel.send(`Your score is: ${score}.`))
    .catch(err => message.channel.send(err.message));
};