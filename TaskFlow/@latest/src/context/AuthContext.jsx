import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName ?? '',
          avatar: firebaseUser.photoURL ?? '',
          provider: firebaseUser.providerData[0]?.providerId ?? 'password',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
      };
      return { error: messages[err.code] ?? err.message };
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'Incorrect email or password.',
        'auth/wrong-password': 'Incorrect email or password.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/invalid-email': 'Please enter a valid email address.',
      };
      return { error: messages[err.code] ?? err.message };
    }
  };

  const socialLogin = async (provider) => {
    const providerInstance = provider === 'google' ? googleProvider : githubProvider;
    await signInWithPopup(auth, providerInstance);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, socialLogin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
