const log = require('debug')('aggretsuko:commands:ping');
const Discord = require('discord.js');

exports.sufix = "ping";
exports.adminCommand = false;

exports.initialise = (client, storage, configuration) => {
    log(`command initialised.`);
};

exports.process = (message, args, client) => {
    var embed = new Discord.RichEmbed()
    .setDescription("This is a description")
    .setAuthor("daniel portella", "https://pbs.twimg.com/profile_images/1022800754418098176/wfdsB3Z__400x400.jpg", "https://twitter.com/dmportella")
    .setThumbnail("https://secure.static.tumblr.com/ec1c4cf8da6acbb80915e1a1d6a9f1ca/vne54ue/eNLn89loi/tumblr_static_maxresdefault.jpg")
    .setTimestamp(new Date())
    .setTitle("Soem title")
    .setURL("https://discord.js.org/#/docs/main/stable/class/RichEmbed?scrollTo=footer")
    .addField("General-Commands", "::games, ::people")
    .addField("Other-Commands", "::example, ::gamble")
    .addField(
      "Music-Commands",
      "::play <playlisturl>/search, ::skip, ::pause/resume, ::stop, ::queue"
    )
    .setFooter("hello world", "");
    message.channel.send(embed);

    log(`member:${message.author.username} executed command.`);
};