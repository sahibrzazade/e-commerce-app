import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
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
}; 