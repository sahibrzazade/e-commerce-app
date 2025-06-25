import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { auth } from '../configs/firebase';

export const authService = {
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },
  async logout() {
    return signOut(auth);
  },
  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },
}; 