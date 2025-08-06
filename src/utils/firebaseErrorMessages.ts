export const getFirebaseAuthErrorMessage = (error: any): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'invalid-email-format';
        case 'auth/user-disabled':
            return 'user-account-has-been-disabled';
        case 'auth/too-many-requests':
            return 'too-many-attempts-please-try-again-later';
        case 'auth/email-already-in-use':
            return 'email-already-registered-use-different-or-sign-in';
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'invalid-email-or-password-please-try-again';
        default:
            return 'sign-in-failed-please-try-again';
    }
};
