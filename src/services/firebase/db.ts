import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, Product, Transaction, Expense, SalesGoal } from '../../types';

// Users
export const createUser = async (userId: string, userData: Omit<User, 'id'>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Products
export const getProducts = async (userId: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('sellerId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Transactions
export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('sellerId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Transaction));
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

// Expenses
export const getExpenses = async (userId: string): Promise<Expense[]> => {
  try {
    const expensesRef = collection(db, 'expenses');
    const q = query(expensesRef, where('sellerId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Expense));
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw error;
  }
};

// Sales Goals
export const getSalesGoals = async (userId: string): Promise<SalesGoal[]> => {
  try {
    const goalsRef = collection(db, 'sales_goals');
    const q = query(goalsRef, where('sellerId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SalesGoal));
  } catch (error) {
    console.error('Error getting sales goals:', error);
    throw error;
  }
};