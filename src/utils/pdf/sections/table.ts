import { PDFContext } from '../types';
import { formatAmount } from '../formatters';

export const drawTable = (ctx: PDFContext): number => {
  const { doc, colors, options, yPos } = ctx;

  try {
    (doc as any).autoTable({
      startY: yPos + 10,
      head: [['Description', 'Type', 'Montant']],
      body: [[
        options.transaction.description || 'Vente',
        options.transaction.saleType === 'product' ? 'Produit' : 'Service',
        `${formatAmount(options.transaction.amount)} FCFA`
      ]],
      styles: {
        fontSize: 12,
        cellPadding: 8,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 60, halign: 'right' }
      }
    });

    return (doc as any).lastAutoTable.finalY;
  } catch (error) {
    console.error('Error drawing table:', error);
    throw new Error('Erreur lors de la génération du tableau');
  }
};