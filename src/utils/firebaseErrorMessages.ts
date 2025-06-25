export const getFirebaseAuthErrorMessage = (error: any): string => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Invalid email format.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later.';
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please use a different email or log in.';
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'Invalid email or password. Please try again.';
        default:
            return 'Login failed. Please try again.';
    }
};
