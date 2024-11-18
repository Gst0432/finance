import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { User } from '../../types';
import toast from 'react-hot-toast';

// Enable persistent auth state
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting persistence:', error);
});

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    // Create Firebase auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Update profile with display name
    await updateProfile(user, { displayName: name });

    // Create initial user document
    const userData: Omit<User, 'id'> = {
      name,
      email,
      role: 'user',
      isPremium: false,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Create user document with same ID as auth UID
    await setDoc(doc(db, 'users', user.uid), userData);
    
    toast.success('Compte créé avec succès');
    return user;
  } catch (error: any) {
    console.error('Error in registerUser:', error);
    if (error.code === 'auth/email-already-in-use') {
      toast.error('Cette adresse email est déjà utilisée');
    } else if (error.code === 'auth/weak-password') {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
    } else if (error.code === 'auth/network-request-failed') {
      toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
    } else {
      toast.error('Erreur lors de l\'inscription');
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Verify user document exists
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (!userDoc.exists()) {
      await signOut(auth);
      toast.error('Compte utilisateur introuvable');
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    if (!userData.isActive) {
      await signOut(auth);
      toast.error('Ce compte a été désactivé');
      throw new Error('Account disabled');
    }

    toast.success('Connexion réussie');
    return userCredential.user;
  } catch (error: any) {
    console.error('Error in loginUser:', error);
    
    if (error.code === 'auth/invalid-credential') {
      toast.error('Email ou mot de passe incorrect');
    } else if (error.code === 'auth/too-many-requests') {
      toast.error('Trop de tentatives. Veuillez réessayer plus tard.');
    } else if (error.code === 'auth/network-request-failed') {
      toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
    } else if (!error.message.includes('Account disabled') && !error.message.includes('User document not found')) {
      toast.error('Erreur lors de la connexion');
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    toast.success('Déconnexion réussie');
  } catch (error) {
    console.error('Error in logoutUser:', error);
    toast.error('Erreur lors de la déconnexion');
    throw error;
  }
};