import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Receipt,
  FileText,
  Settings,
  Users,
  Bell,
  LogOut,
  CreditCard,
  BarChart3,
  Link as LinkIcon,
  Target,
  DollarSign
} from 'lucide-react';
import Logo from '../ui/Logo';

interface DashboardLayoutProps {
  isAdmin?: boolean;
}

const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const userNavigation = [
    { name: 'Tableau de bord', icon: LayoutDashboard, href: '/app' },
    { name: 'Produits', icon: Package, href: '/app/products' },
    { name: 'Services', icon: ShoppingBag, href: '/app/services' },
    { name: 'Ventes', icon: Receipt, href: '/app/sales' },
    { name: 'Ventes d\'abonnements', icon: CreditCard, href: '/app/subscription-sales' },
    { name: 'Dépenses', icon: DollarSign, href: '/app/expenses' },
    { name: 'Objectifs', icon: Target, href: '/app/goals' },
    { name: 'Liens numériques', icon: LinkIcon, href: '/app/digital-links' },
    { name: 'Rapports', icon: FileText, href: '/app/reports' },
    { name: 'Paramètres', icon: Settings, href: '/app/settings' }
  ];

  const adminNavigation = [
    { name: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
    { name: 'Utilisateurs', icon: Users, href: '/admin/users' },
    { name: 'Abonnements', icon: CreditCard, href: '/admin/subscriptions' },
    { name: 'Analyses', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Notifications', icon: Bell, href: '/admin/notifications' },
    { name: 'Paramètres', icon: Settings, href: '/admin/settings' }
  ];

  const navigation = isAdmin ? adminNavigation : userNavigation;

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
            <Logo />
          </div>

          <div className="flex-1 px-4 space-y-1 overflow-y-auto">
            <nav className="space-y-1 py-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;