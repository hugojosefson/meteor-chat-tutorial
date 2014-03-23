Accounts.validateLoginAttempt(function (attempt) {
    return (
        attempt.allowed
        && attempt.type === 'google'
        && attempt.user
        && attempt.user.services
        && attempt.user.services.google
        && attempt.user.services.google.email
        );
});