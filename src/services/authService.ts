import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../configs/firebase';

export const authService = {
  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },
  async signOut() {
    return signOut(auth);
  },
  async signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },
  async changePassword(currentPassword: string, newPassword: string) {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No authenticated user found');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    return updatePassword(user, newPassword);
  },
}; 