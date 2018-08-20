exports.getPrintableUserName = (message) => {
    if(message.member.nickname) return message.member.nickname
    else return message.author.username;
};