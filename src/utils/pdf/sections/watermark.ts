import { PDFContext } from '../types';

export const drawWatermark = (ctx: PDFContext): void => {
  const { doc, options } = ctx;
  
  if (!options.isPremium) {
    try {
      // Save current state
      doc.saveGraphicsState();
      
      // Set watermark properties
      const opacity = new doc.GState({ opacity: 0.1 });
      doc.setGState(opacity);
      doc.setTextColor(128, 128, 128);
      doc.setFontSize(40);
      doc.setFont('helvetica', 'bold');
      
      // Calculate center position
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const centerX = pageWidth / 2;
      const centerY = pageHeight / 2;
      
      // Draw rotated watermark
      doc.save();
      doc.rotate(45, centerX, centerY);
      doc.text('G-FINANCE', centerX, centerY, { align: 'center' });
      doc.restore();
      
      // Restore original state
      doc.restoreGraphicsState();
    } catch (error) {
      console.warn('Watermark drawing failed:', error);
    }
  }
};