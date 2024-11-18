import { PDFContext } from '../types';

export const drawHeader = async (ctx: PDFContext): Promise<number> => {
  const { doc, colors, options } = ctx;
  let yPos = 15;

  // Background gradient
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');

  // Company logo
  if (options.companyInfo?.logo) {
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            doc.addImage(img, 'PNG', 10, 10, 30, 30);
            resolve(true);
          } catch (e) {
            reject(e);
          }
        };
        img.onerror = reject;
        img.src = options.companyInfo.logo;
      });
    } catch (error) {
      console.warn('Logo loading failed:', error);
    }
  }

  // Document title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const title = options.type === 'receipt' ? 'REÇU' : 
                options.type === 'invoice' ? 'FACTURE' : 
                'BON DE VENTE';
  doc.text(title, 105, yPos, { align: 'center' });

  // Document number
  yPos = 35;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const docType = options.type === 'receipt' ? 'Reçu' : 
                  options.type === 'invoice' ? 'Facture' : 
                  'Bon';
  const docNumber = `N° ${docType}: ${options.transaction.id.slice(0, 8).toUpperCase()}`;
  doc.text(docNumber, 105, yPos, { align: 'center' });

  return yPos + 25;
};