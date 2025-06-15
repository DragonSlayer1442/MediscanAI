// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';

const pdfService = {
  exportPDF: async (report) => {
    // PDF export is disabled because react-native-html-to-pdf is not supported in Expo managed workflow.
    // const htmlContent = `
    //   <h1>Medical AI Report</h1>
    //   <p>${report.replace(/\n/g, '<br/>')}</p>
    // `;

    // const file = await RNHTMLtoPDF.convert({
    //   html: htmlContent,
    //   fileName: 'MediScan_Report',
    //   base64: false,
    // });

    // await Sharing.shareAsync(file.filePath);
    alert('PDF export is not available in this build.');
  }
};

export default pdfService;
