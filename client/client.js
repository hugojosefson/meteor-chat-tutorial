/**
 * Templates
 */
Template.messages.messages = function () {
    return Messages.find({}, { sort: { time: -1 }});
};

Template.messages.humanizeTime = function (time) {
    return moment(time).fromNow();
};

function deleteMessage(event) {
    Messages.remove({_id: event.target.dataset.messageId});
}

Template.messages.events = {
    'click button.close': deleteMessage
};

function sendMessage() {
    var message = document.getElementById('message');
    var user = Meteor.user();

    if (user && message.value !== '') {
        Messages.insert({
            authorId: user._id,
            message: message.value,
            time: Date.now()
        });

        document.getElementById('message').value = '';
        message.value = '';
    }
}

Template.input.events = {
    'keydown input#message': function (event) {
        if (event.which === 13) { // 13 is the enter key event
            sendMessage();
        }
    },
    'click button.btn-primary': sendMessage
};