Meteor.publish('messages', function () {
    if (this.userId) {
        return Messages.find();
    } else {
        this.ready();
    }
});

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find(
            {},
            {
                fields: {
                    'services.google.given_name': 1,
                    'services.google.picture': 1
                }
            }
        );
    } else {
        this.ready();
    }
});