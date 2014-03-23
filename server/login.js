Accounts.validateLoginAttempt(function (attempt) {

    function isAllowedResume(attempt) {
        return attempt.allowed && attempt.type === 'resume';
    }

    function isAnyGoogleAccount(attempt) {
        return attempt.type === 'google'
            && attempt.user
            && attempt.user.services
            && attempt.user.services.google
            && attempt.user.services.google.email;
    }

    function isAllowedGoogleAccount(attempt) {
        return attempt.allowed
            && isAnyGoogleAccount(attempt)
            && (
                attempt.user.services.google.email === 'hugo@josefson.org'
                || attempt.user.services.google.email === 'maria.kristina@josefson.org'
                );

    }

    return isAllowedResume(attempt) || isAllowedGoogleAccount(attempt);
});