import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, TrendingUp, Ban, CheckCircle, Eye, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const Users = () => {
  const navigate = useNavigate();
  const { users, updateUser, addUser } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showInactiveUsers, setShowInactiveUsers] = React.useState(false);
  const [showNewUserModal, setShowNewUserModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    isPremium: false,
    premiumDuration: 1,
    companyInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  });

  const regularUsers = users.filter(user => 
    user.role === 'user' &&
    (showInactiveUsers || user.isActive) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (user.phone && user.phone.includes(searchTerm)))
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = {
        id: crypto.randomUUID(),
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        role: 'user' as const,
        isPremium: newUser.isPremium,
        premiumExpiryDate: newUser.isPremium ? 
          addMonths(new Date(), newUser.premiumDuration).toISOString() : 
          undefined,
        autoRenew: false,
        createdAt: new Date().toISOString(),
        isActive: true,
        companyInfo: newUser.companyInfo.name ? newUser.companyInfo : undefined
      };

      addUser(user);
      setShowNewUserModal(false);
      setNewUser({
        name: '',
        email: '',
        password: '',
        phone: '',
        isPremium: false,
        premiumDuration: 1,
        companyInfo: {
          name: '',
          address: '',
          phone: '',
          email: ''
        }
      });
      toast.success('Utilisateur créé avec succès');
    } catch (error) {
      toast.error("Erreur lors de la création de l'utilisateur");
    }
  };

  const handleToggleStatus = async (userId: string, isActive: boolean) => {
    try {
      await updateUser(userId, { isActive: !isActive });
      toast.success(`Compte ${isActive ? 'désactivé' : 'activé'} avec succès`);
    } catch (error) {
      toast.error("Erreur lors de la modification du statut du compte");
    }
  };

  const handleTogglePremium = async (userId: string, isPremium: boolean) => {
    try {
      const updates = {
        isPremium: !isPremium,
        premiumExpiryDate: !isPremium ? 
          addMonths(new Date(), 1).toISOString() : 
          undefined,
        autoRenew: false
      };

      await updateUser(userId, updates);
      toast.success(`Premium ${isPremium ? 'désactivé' : 'activé'} avec succès`);
    } catch (error) {
      toast.error("Erreur lors de la modification du statut premium");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Retour
        </button>
        <button
          onClick={() => setShowNewUserModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Nouvel Utilisateur
        </button>
      </div>

      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Créer un nouvel utilisateur
            </h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={newUser.isPremium}
                      onChange={(e) => setNewUser(prev => ({ ...prev, isPremium: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-900">
                      Activer Premium
                    </label>
                  </div>

                  {newUser.isPremium && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Durée Premium (mois)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newUser.premiumDuration}
                        onChange={(e) => setNewUser(prev => ({ ...prev, premiumDuration: parseInt(e.target.value) }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 border-t pt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Informations entreprise (optionnel)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nom de l'entreprise
                      </label>
                      <input
                        type="text"
                        value={newUser.companyInfo.name}
                        onChange={(e) => setNewUser(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, name: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={newUser.companyInfo.address}
                        onChange={(e) => setNewUser(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, address: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Téléphone entreprise
                      </label>
                      <input
                        type="tel"
                        value={newUser.companyInfo.phone}
                        onChange={(e) => setNewUser(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, phone: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email entreprise
                      </label>
                      <input
                        type="email"
                        value={newUser.companyInfo.email}
                        onChange={(e) => setNewUser(prev => ({
                          ...prev,
                          companyInfo: { ...prev.companyInfo, email: e.target.value }
                        }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewUserModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showInactive"
              checked={showInactiveUsers}
              onChange={(e) => setShowInactiveUsers(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showInactive" className="text-sm text-gray-600">
              Afficher les utilisateurs inactifs
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {regularUsers.map((user) => (
                <tr key={user.id} className={!user.isActive ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        {user.companyInfo?.name && (
                          <div className="text-sm text-gray-500">
                            {user.companyInfo.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    {user.phone && (
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(user.createdAt), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isPremium ? (
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Premium
                        </span>
                        {user.premiumExpiryDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Expire le {format(new Date(user.premiumExpiryDate), 'dd/MM/yyyy')}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir les détails"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}/subscriptions`)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Abonnements"
                      >
                        <CreditCard className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}/sales`)}
                        className="text-green-600 hover:text-green-900"
                        title="Ventes"
                      >
                        <TrendingUp className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleTogglePremium(user.id, user.isPremium)}
                        className={`${
                          user.isPremium
                            ? 'text-yellow-600 hover:text-yellow-900'
                            : 'text-blue-600 hover:text-blue-900'
                        }`}
                        title={user.isPremium ? 'Désactiver Premium' : 'Activer Premium'}
                      >
                        <CreditCard className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        className={`${
                          user.isActive
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={user.isActive ? 'Désactiver' : 'Activer'}
                      >
                        {user.isActive ? (
                          <Ban className="h-5 w-5" />
                        ) : (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {regularUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;