import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Définition des collections Firestore
export const usersCollection = collection(db, 'users');
export const productsCollection = collection(db, 'products');
export const transactionsCollection = collection(db, 'transactions');
export const expensesCollection = collection(db, 'expenses');
export const salesGoalsCollection = collection(db, 'sales_goals');