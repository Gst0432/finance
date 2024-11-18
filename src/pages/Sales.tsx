import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { Transaction } from '../types';
import DocumentGenerator from '../components/documents/DocumentGenerator';
import { useNavigate } from 'react-router-dom';

export default function Sales() {
  const navigate = useNavigate();
  const { transactions, addTransaction, products, services, user } = useStore();
  const [showNewSaleForm, setShowNewSaleForm] = React.useState(false);
  const [newSale, setNewSale] = React.useState({
    amount: 0,
    description: '',
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    paymentMethod: 'cash',
    itemId: '',
    saleType: 'product',
    selectedItem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const transaction: Transaction = {
        id: crypto.randomUUID(),
        type: 'sale',
        date: new Date().toISOString(),
        status: 'completed',
        buyerDetails: {
          name: newSale.buyerName,
          phone: newSale.buyerPhone,
          email: newSale.buyerEmail,
        },
        ...newSale,
      };
      
      addTransaction(transaction);
      setShowNewSaleForm(false);
      setNewSale({
        amount: 0,
        description: '',
        buyerName: '',
        buyerPhone: '',
        buyerEmail: '',
        paymentMethod: 'cash',
        itemId: '',
        saleType: 'product',
        selectedItem: ''
      });
      toast.success('Vente enregistrée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement de la vente');
    }
  };

  const handleItemSelection = (itemId: string) => {
    const selectedProduct = products.find(p => p.id === itemId);
    const selectedService = services.find(s => s.id === itemId);
    
    if (selectedProduct) {
      setNewSale(prev => ({
        ...prev,
        selectedItem: itemId,
        amount: selectedProduct.sellingPrice,
        description: selectedProduct.name
      }));
    } else if (selectedService) {
      setNewSale(prev => ({
        ...prev,
        selectedItem: itemId,
        amount: selectedService.price,
        description: selectedService.title
      }));
    }
  };

  const totalSales = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Ventes</h2>
            <p className="text-sm text-gray-500">
              Gérez vos ventes et générez des documents
            </p>
          </div>
          <button
            onClick={() => setShowNewSaleForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Nouvelle Vente
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm font-medium text-blue-600">Total des ventes</p>
          <p className="text-2xl font-bold text-blue-900">
            {totalSales.toLocaleString()} FCFA
          </p>
        </div>

        {showNewSaleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enregistrer une vente
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de vente
                  </label>
                  <select
                    value={newSale.saleType}
                    onChange={(e) => setNewSale(prev => ({ ...prev, saleType: e.target.value, selectedItem: '' }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="product">Produit</option>
                    <option value="service">Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {newSale.saleType === 'product' ? 'Produit' : 'Service'}
                  </label>
                  <select
                    value={newSale.selectedItem}
                    onChange={(e) => handleItemSelection(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez un {newSale.saleType === 'product' ? 'produit' : 'service'}</option>
                    {newSale.saleType === 'product' 
                      ? products.map(p => (
                          <option key={p.id} value={p.id}>{p.name} - {p.sellingPrice} FCFA</option>
                        ))
                      : services.map(s => (
                          <option key={s.id} value={s.id}>{s.title} - {s.price} FCFA</option>
                        ))
                    }
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Montant (FCFA)
                  </label>
                  <input
                    type="number"
                    value={newSale.amount}
                    onChange={(e) => setNewSale(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newSale.description}
                    onChange={(e) => setNewSale(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    value={newSale.buyerName}
                    onChange={(e) => setNewSale(prev => ({ ...prev, buyerName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone du client
                  </label>
                  <input
                    type="tel"
                    value={newSale.buyerPhone}
                    onChange={(e) => setNewSale(prev => ({ ...prev, buyerPhone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email du client
                  </label>
                  <input
                    type="email"
                    value={newSale.buyerEmail}
                    onChange={(e) => setNewSale(prev => ({ ...prev, buyerEmail: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mode de paiement
                  </label>
                  <select
                    value={newSale.paymentMethod}
                    onChange={(e) => setNewSale(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="cash">Espèces</option>
                    <option value="mobile">Mobile Money</option>
                    <option value="card">Carte bancaire</option>
                    <option value="transfer">Virement bancaire</option>
                    <option value="crypto">Cryptomonnaie</option>
                    <option value="money_transfer">Transfert d'argent</option>
                  </select>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewSaleForm(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mode de paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.buyerDetails?.name}</div>
                    <div className="text-xs text-gray-500">{transaction.buyerDetails?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.saleType === 'product' ? 'Produit' : 'Service'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.amount.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentMethod === 'cash' && 'Espèces'}
                    {transaction.paymentMethod === 'mobile' && 'Mobile Money'}
                    {transaction.paymentMethod === 'card' && 'Carte bancaire'}
                    {transaction.paymentMethod === 'transfer' && 'Virement bancaire'}
                    {transaction.paymentMethod === 'crypto' && 'Cryptomonnaie'}
                    {transaction.paymentMethod === 'money_transfer' && 'Transfert d\'argent'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <DocumentGenerator transaction={transaction} />
                      {!user?.isPremium && (
                        <Crown 
                          className="h-4 w-4 text-gray-400 cursor-pointer" 
                          onClick={() => navigate('/subscriptions')}
                          title="Passez à la version Premium pour plus d'options"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Aucune vente enregistrée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}