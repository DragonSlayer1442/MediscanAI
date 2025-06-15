import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const pdfService = {
  exportPDF: async (report) => {
    try {
      const htmlContent = `
        <h1 style="color:#1976d2;">Medical AI Report</h1>
        <p>${report.replace(/\n/g, '<br/>')}</p>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('PDF Export error:', error);
      alert('Failed to export PDF: ' + error.message);
    }
  }
};

export default pdfService;
