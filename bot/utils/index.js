const moment = require('moment');

exports.getPrintableUserName = (message) => {
    if(message.member.nickname) return message.member.nickname
    else return message.author.username;
};

exports.getFormattedDateTime = (time) => {
    const toFormat = time ? time : this.getTime();

    return toFormat.format('YYYY-MM-DDTHH:mm:ss.sss');
};

exports.getDateTime = (time) => {
    return moment.utc(new Date(time),"DD/MM/YYYY HH:mm:ss");
};

exports.getTime = (time) => {
    return moment.utc(time ? time : new Date(),"DD/MM/YYYY HH:mm:ss");
};