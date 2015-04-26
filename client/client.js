/**
 * Templates
 */
Template.messages.helpers({
    messages: function () {
        return Messages.find({}, {sort: {time: -1}});
    },
    humanizeTime: function (time) {
        return moment(time).locale('sv').from(Session.get('now'));
    },
    events: {
        'click button.close': deleteMessage
    }
});

Meteor.setInterval(function () {
    Session.set('now', Date.now());
}, 1000);

function deleteMessage(event) {
    Messages.remove({_id: event.target.dataset.messageId});
}

function sendMessage() {
    var message = document.getElementById('message');
    var user = Meteor.user();

    if (user && message.value !== '') {
        Messages.insert({
            authorId: user._id,
            message: message.value,
            time: Date.now()
        });

        message.value = '';
    }
}

function saveDraftMessage() {
    var message = document.getElementById('message');
    UserSession.set('draftMessage', message.value);
}

function loadDraftMessage() {
    var message = UserSession.get('draftMessage');
    document.getElementById('message').value = message == null ? '' : message;
}

function discardDraftMessage() {
    UserSession.delete('draftMessage');
}

Template.input.helpers({
    events: {
        'keydown input#message': function (event) {
            if (event.which === 13) { // 13 is the enter key event
                sendMessage();
                discardDraftMessage();
                return false;
            } else {
                saveDraftMessage();
            }
        },
        'click button.btn-primary': function () {
            sendMessage();
            discardDraftMessage();
            return false;
        }
    },
    rendered: function () {
        loadDraftMessage();
    }
});


Template.android.helpers({
    android: function () {
        return typeof android !== 'undefined';
    },
    events: {
        'click #login-android': function (event) {
            android.obtainGoogleAccessToken('accessTokenCallback');
            return false;
        }
    },
    rendered: function () {
        if (typeof android !== 'undefined') {
            window.accessTokenCallback = function accessTokenCallback(accessToken) {
                window.alert('Access token from Java: ' + accessToken);
            };
        }
    }
});