import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (!userData.isActive) {
              await auth.signOut();
              setUser(null);
              toast.error('Ce compte a été désactivé');
              return;
            }
            
            setUser({
              id: firebaseUser.uid,
              ...userData as Omit<User, 'id'>
            });
          } else {
            setUser(null);
            setError(new Error('Données utilisateur non trouvées'));
          }
        } else {
          setUser(null);
        }
      } catch (err: any) {
        console.error('Error in auth state change:', err);
        if (err.code === 'permission-denied') {
          setUser(null);
          await auth.signOut();
        }
        setError(err instanceof Error ? err : new Error('Erreur d\'authentification'));
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}