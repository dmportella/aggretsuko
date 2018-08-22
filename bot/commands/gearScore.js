const log = require('debug')('aggretsuko:commands:gearscore');

function fetchScore(message, args) {
    if (args && args.lenght > 0) {
        const parsed = parseInt(args[0]);
        if(Number.isNaN(parsed) && !Number.isInteger(parsed)) 
        { 
            return Promise.reject(new Error(`You are not the smartest person I know... use a number!`));
            
        }
        return Promise.resolve(parsed);
    }
    return getGearScoreFromStorage(message);
}

function getGearScoreFromStorage(message) {
    return new Promise((resolve) => resolve(100));
}

exports.sufix = "gearscore";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);
    
    fetchScore(message, args)
    .then(score => message.channel.send(`Your score is: ${score}.`))
    .catch(err => message.channel.send(err.message));
};