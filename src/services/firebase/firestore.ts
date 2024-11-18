import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Product, Service, Transaction, User } from '../../types';

// Users
export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
  } catch (error) {
    throw new Error('Échec de la récupération des données utilisateur');
  }
};

// Products
export const getProducts = async (userId: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('sellerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    throw new Error('Échec de la récupération des produits');
  }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const docRef = await setDoc(doc(collection(db, 'products')), {
      ...product,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Échec de l\'ajout du produit');
  }
};

// Services
export const getServices = async (userId: string): Promise<Service[]> => {
  try {
    const q = query(
      collection(db, 'services'),
      where('sellerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service));
  } catch (error) {
    throw new Error('Échec de la récupération des services');
  }
};

// Transactions
export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<string> => {
  try {
    const docRef = await setDoc(doc(collection(db, 'transactions')), transaction);
    return docRef.id;
  } catch (error) {
    throw new Error('Échec de l\'enregistrement de la transaction');
  }
};