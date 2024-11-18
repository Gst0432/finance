import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

// Pages publiques
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Subscriptions from '../pages/Subscriptions';

// Pages utilisateur
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Sales from '../pages/Sales';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import SubscriptionSales from '../pages/SubscriptionSales';
import Expenses from '../pages/Expenses';
import SalesGoals from '../pages/SalesGoals';
import DigitalLinks from '../pages/DigitalLinks';

// Pages admin
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminAds from '../pages/admin/Ads';
import AdminSettings from '../pages/admin/Settings';
import AdminReports from '../pages/admin/Reports';
import AdminSubscriptions from '../pages/admin/Subscriptions';
import AdminAnalytics from '../pages/admin/Analytics';
import AdminNotifications from '../pages/admin/Notifications';

// Layouts
import DashboardLayout from '../components/layout/DashboardLayout';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const PrivateRoute = ({ children, adminRequired = false }: PrivateRouteProps) => {
  const { user, loading } = useAuthContext();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminRequired && user.role !== 'admin') {
    return <Navigate to="/app" />;
  }

  return <>{children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/subscriptions" element={<Subscriptions />} />

      {/* Routes utilisateur */}
      <Route path="/app" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="sales" element={<Sales />} />
        <Route path="reports" element={<Reports />} />
        <Route path="subscription-sales" element={<SubscriptionSales />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="goals" element={<SalesGoals />} />
        <Route path="digital-links" element={<DigitalLinks />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Routes admin */}
      <Route path="/admin" element={
        <PrivateRoute adminRequired>
          <DashboardLayout isAdmin />
        </PrivateRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="ads" element={<AdminAds />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}