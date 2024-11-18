export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isPremium: boolean;
  premiumExpiryDate?: string;
  autoRenew?: boolean;
  password?: string;
  phone?: string;
  createdAt: string;
  isActive: boolean;
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    logo?: string;
  };
}

export interface Transaction {
  id: string;
  type: 'premium' | 'sale';
  amount: number;
  date: string;
  description?: string;
  buyerDetails?: {
    name: string;
    email: string;
    phone?: string;
  };
  paymentMethod?: string;
  status?: string;
  itemId?: string;
  sellerId?: string;
  buyerId?: string;
}

export interface Product {
  id: string;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  sellerId: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  expiryDate: string;
  sellerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SalesGoal {
  id: string;
  sellerId: string;
  target: number;
  current: number;
  startDate: string;
  endDate: string;
  type: 'monthly' | 'yearly';
}

export interface AdRevenue {
  lastMonth: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface Expense {
  id: string;
  sellerId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  sellerId?: string;
}

export interface AdSenseRevenue {
  id: string;
  date: string;
  amount: number;
  impressions: number;
  clicks: number;
}