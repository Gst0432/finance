import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product, Service, Transaction, User } from '../types';

// Users
export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as User));
};

// Products
export const getProducts = async (userId: string): Promise<Product[]> => {
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
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'products'), {
    ...product,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  await updateDoc(doc(db, 'products', id), updates);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id));
};

// Services
export const getServices = async (userId: string): Promise<Service[]> => {
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
};

export const addService = async (service: Omit<Service, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'services'), {
    ...service,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const updateService = async (id: string, updates: Partial<Service>): Promise<void> => {
  await updateDoc(doc(db, 'services', id), updates);
};

export const deleteService = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'services', id));
};

// Transactions
export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  const q = query(
    collection(db, 'transactions'),
    where('sellerId', '==', userId),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Transaction));
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'transactions'), transaction);
  return docRef.id;
};