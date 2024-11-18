import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Transaction } from '../types';
import { drawHeader } from './pdf/sections/header';
import { drawDetails } from './pdf/sections/details';
import { drawTable } from './pdf/sections/table';
import { drawWatermark } from './pdf/sections/watermark';
import { PDFContext } from './pdf/types';

interface GeneratePDFOptions {
  type: 'receipt' | 'invoice' | 'sale';
  transaction: Transaction;
  companyInfo?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    logo?: string;
  };
  isPremium?: boolean;
}

export async function generatePDF({ type, transaction, companyInfo, isPremium = false }: GeneratePDFOptions): Promise<void> {
  try {
    const doc = new jsPDF();
    
    // Configuration des couleurs
    const colors = {
      primary: [102, 103, 171], // Violet
      secondary: [80, 80, 80], // Gris foncé
      lightGray: [245, 245, 245] // Gris clair
    };

    // Contexte PDF partagé
    const ctx: PDFContext = {
      doc,
      colors,
      yPos: 0,
      options: { type, transaction, companyInfo, isPremium }
    };

    // En-tête
    ctx.yPos = await drawHeader(ctx);

    // Filigrane pour les utilisateurs non premium
    if (!isPremium) {
      drawWatermark(ctx);
    }

    // Détails
    ctx.yPos = drawDetails(ctx);

    // Tableau des produits/services
    ctx.yPos = drawTable(ctx);

    // Notes et conditions
    ctx.yPos = doc.internal.pageSize.height - 50;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Merci de votre confiance', 105, ctx.yPos, { align: 'center' });
    ctx.yPos += 5;
    doc.text('Ce document est généré électroniquement', 105, ctx.yPos + 5, { align: 'center' });

    // Pied de page uniquement pour les utilisateurs non premium
    if (!isPremium) {
      doc.setFillColor(...colors.primary);
      doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('Document généré par G-Finance', 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    // QR Code pour la vérification
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.1);
    doc.rect(20, doc.internal.pageSize.height - 40, 30, 30);
    doc.setFontSize(6);
    doc.setTextColor(...colors.secondary);
    doc.text('Scanner pour vérifier', 35, doc.internal.pageSize.height - 25, { align: 'center' });

    // Sauvegarder le PDF
    const fileName = `${type}_${transaction.id.slice(0, 8)}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Erreur lors de la génération du document');
  }
}