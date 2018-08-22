const log = require('debug')('aggretsuko:commands:clearChannel');

exports.sufix = "clear";
exports.adminCommand = true;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    let defaultMessagesToDelete = 100;

    log(`member:${message.author.username} executed command on channel:${message.channel.name}.`);
    
    if (args) {
        const parsed = parseInt(args[0]);
        if(!Number.isNaN(parsed) && Number.isInteger(parsed)) defaultMessagesToDelete = parsed;
    }
    
    message.channel.bulkDelete(defaultMessagesToDelete).catch((err) => {
        message.channel.send(`I can't clear the messages for some reason... :thinking:\n\`\`\`css${err.message}\`\`\``);
    });
};