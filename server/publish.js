Meteor.publish('messages', function () {
    if (this.userId) {
        return Messages.find();
    }
});

Meteor.publish('userData', function () {
    if (this.userId) {
        return Meteor.users.find(
            {},
            {
                fields: {
                    'services.google.name': 1,
                    'services.google.picture': 1
                }
            }
        );
    }
});