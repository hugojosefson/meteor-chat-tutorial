/**
 * Models
 */

Messages = new Meteor.Collection('messages', {
    transform: function (message) {
        message.author = {
            id: message.authorId
        };
        var user = Meteor.users.findOne({_id: message.authorId});
        if (user && user.services && user.services.google) {
            message.author.name = user.services.google.name;
            message.author.picture = user.services.google.picture;
        }
        return message;
    }
});
Messages.allow({
    insert: function (userId, message) {
        return userId === message.authorId;
    }
});
