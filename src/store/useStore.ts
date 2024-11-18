import { create } from 'zustand';
import { User, Transaction, Product, Service, SalesGoal, Expense } from '../types';

// Default admin user
const defaultAdmin: User = {
  id: '1',
  name: 'Administrateur',
  email: '227makemoney@gmail.com',
  password: 'admin123',
  role: 'admin',
  isPremium: true,
  createdAt: new Date().toISOString(),
  isActive: true,
  companyInfo: {
    name: 'G-Finance',
    address: 'Niamey, Niger',
    phone: '+227 XX XX XX XX',
    email: 'contact@g-finance.com'
  }
};

interface Store {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;

  // Products state
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Services state
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Transactions state
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;

  // Sales goals state
  salesGoals: SalesGoal[];
  addSalesGoal: (goal: SalesGoal) => void;

  // Expenses state
  expenses: Expense[];
  addExpense: (expense: Expense) => void;

  // Digital Products state
  digitalProductTables: Array<{
    id: string;
    name: string;
    sellerId: string;
    products: Array<{
      id: string;
      name: string;
      description: string;
      link: string;
    }>;
  }>;
  addDigitalProductTable: (table: { id: string; name: string; sellerId: string; products: any[] }) => void;
  deleteDigitalProductTable: (id: string) => void;
  addDigitalProduct: (tableId: string, product: { name: string; description: string; link: string }) => void;
  updateDigitalProduct: (tableId: string, productId: string, updates: { name: string; description: string; link: string }) => void;
  deleteDigitalProduct: (tableId: string, productId: string) => void;

  // Ads state
  showAds: boolean;
  setShowAds: (show: boolean) => void;

  // Payment state
  merchantId: string;
  setMerchantId: (id: string) => void;

  // Subscription sales state
  subscriptionSales: Array<{
    id: string;
    serviceName: string;
    duration: number;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    purchaseDate: string;
    expiryDate: string;
    status: 'active' | 'expired';
    sellerId: string;
  }>;
  addSubscriptionSale: (sale: any) => void;

  // Notifications state
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  // Initialize all state with default values
  user: null,
  users: [defaultAdmin],
  products: [],
  services: [],
  transactions: [],
  salesGoals: [],
  expenses: [],
  digitalProductTables: [],
  showAds: true,
  merchantId: '1936',
  subscriptionSales: [],
  notifications: [],

  // User actions
  setUser: (user) => set({ user }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updates } : user
    )
  })),

  // Product actions
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    )
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),

  // Service actions
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  updateService: (id, updates) => set((state) => ({
    services: state.services.map(service =>
      service.id === id ? { ...service, ...updates } : service
    )
  })),
  deleteService: (id) => set((state) => ({
    services: state.services.filter(service => service.id !== id)
  })),

  // Transaction actions
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction]
  })),

  // Sales goals actions
  addSalesGoal: (goal) => set((state) => ({
    salesGoals: [...state.salesGoals, goal]
  })),

  // Expenses actions
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, expense]
  })),

  // Digital Products actions
  addDigitalProductTable: (table) => set((state) => ({
    digitalProductTables: [...state.digitalProductTables, { ...table, products: [] }]
  })),
  deleteDigitalProductTable: (id) => set((state) => ({
    digitalProductTables: state.digitalProductTables.filter(table => table.id !== id)
  })),
  addDigitalProduct: (tableId, product) => set((state) => ({
    digitalProductTables: state.digitalProductTables.map(table =>
      table.id === tableId
        ? {
            ...table,
            products: [...table.products, { ...product, id: crypto.randomUUID() }]
          }
        : table
    )
  })),
  updateDigitalProduct: (tableId, productId, updates) => set((state) => ({
    digitalProductTables: state.digitalProductTables.map(table =>
      table.id === tableId
        ? {
            ...table,
            products: table.products.map(product =>
              product.id === productId ? { ...product, ...updates } : product
            )
          }
        : table
    )
  })),
  deleteDigitalProduct: (tableId, productId) => set((state) => ({
    digitalProductTables: state.digitalProductTables.map(table =>
      table.id === tableId
        ? {
            ...table,
            products: table.products.filter(product => product.id !== productId)
          }
        : table
    )
  })),

  // Ads actions
  setShowAds: (show) => set({ showAds: show }),

  // Payment actions
  setMerchantId: (id) => set({ merchantId: id }),

  // Subscription sales actions
  addSubscriptionSale: (sale) => set((state) => ({
    subscriptionSales: [...state.subscriptionSales, sale]
  })),

  // Notifications actions
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    )
  })),
  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(notification => notification.id !== id)
  }))
}));