export const formatAmount = (amount: number | undefined): string => {
  if (typeof amount !== 'number') return '0';
  return amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).replace(/,/g, '.');
};

export const getPaymentMethodLabel = (method: string = 'cash'): string => {
  const methods: { [key: string]: string } = {
    cash: 'Espèces',
    mobile: 'Mobile Money',
    card: 'Carte bancaire',
    transfer: 'Virement bancaire',
    crypto: 'Cryptomonnaie',
    money_transfer: 'Transfert d\'argent'
  };
  return methods[method] || method;
};