import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import moment from 'moment';  // you can use this for date formatting

const pdfService = {
  exportPDF: async (report, images, name, birthday) => {
    try {
      const today = moment().format('YYYY-MM-DD HH:mm');

      // Handle images HTML
      let imagesHtml = '';
      if (images.length > 0) {
        imagesHtml = images.map(url => `<img src="${url}" style="width:200px;height:200px;margin:10px;" />`).join('');
      }

      const htmlContent = `
        <h1 style="color:#1976d2;">Medical AI Report</h1>
        <p><strong>Generated at:</strong> ${today}</p>
        <p><strong>Patient Name:</strong> ${name}</p>
        <p><strong>Birthday:</strong> ${birthday}</p>
        <h2>Diagnosis:</h2>
        <p>${report.replace(/\n/g, '<br/>')}</p>
        <h2>Generated Images:</h2>
        ${imagesHtml}
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
