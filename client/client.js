/**
 * Templates
 */
Template.messages.messages = function () {
    return Messages.find({}, { sort: { time: -1 }});
};

Template.messages.humanizeTime = function (time) {
    return moment(time).fromNow();
};

Template.input.events = {
    'keydown input#message': function (event) {
        if (event.which === 13) { // 13 is the enter key event
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
    }
};