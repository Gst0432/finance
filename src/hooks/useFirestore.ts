import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { getProducts, getTransactions, getExpenses, getSalesGoals } from '../services/firebase/db';
import { Product, Transaction, Expense, SalesGoal } from '../types';

export function useFirestore() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [salesGoals, setSalesGoals] = useState<SalesGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [
          productsData,
          transactionsData,
          expensesData,
          salesGoalsData
        ] = await Promise.all([
          getProducts(user.id),
          getTransactions(user.id),
          getExpenses(user.id),
          getSalesGoals(user.id)
        ]);

        setProducts(productsData);
        setTransactions(transactionsData);
        setExpenses(expensesData);
        setSalesGoals(salesGoalsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err : new Error('Error fetching data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return {
    products,
    transactions,
    expenses,
    salesGoals,
    loading,
    error
  };
}