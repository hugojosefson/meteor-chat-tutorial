Accounts.validateLoginAttempt(function (attempt) {
    return (
        attempt.allowed
        && attempt.type === 'google'
        && attempt.user
        && attempt.user.services
        && attempt.user.services.google
        && attempt.user.services.google.email
        && (
        attempt.user.services.google.email === 'hugo@josefson.org'
        || attempt.user.services.google.email === 'maria.kristina@josefson.org'
        )
        );
});