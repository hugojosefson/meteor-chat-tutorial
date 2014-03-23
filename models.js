/**
 * Models
 */

Messages = new Meteor.Collection('messages', {
    transform: function (message) {
        message.isOwnMessage = isOwnMessage(Meteor.userId(), message);
        message.author = {
            id: message.authorId
        };
        var user = Meteor.users.findOne({_id: message.authorId});
        if (user && user.services && user.services.google) {
            message.author.name = user.services.google.given_name || user.services.google.name;
            message.author.picture = user.services.google.picture;
        }
        return message;
    }
});

function isOwnMessage(userId, message) {
    return userId === message.authorId;
}

Messages.allow({
    insert: isOwnMessage,
    remove: isOwnMessage
});
