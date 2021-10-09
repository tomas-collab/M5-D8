
import PdfPrinter from 'pdfmake'

const fonts = {
    Roboto: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    }
  };
  

  export const getPDFReadableStream = ()=>{

      const printer = new PdfPrinter(fonts);

      
      const docDefinition = {
        content:['first paragraph','another paragraph']
      };
      
      const options = {}
      const PDFReadableStream = printer.createPdfKitDocument(docDefinition, options);
      PDFReadableStream.end()
      return PDFReadableStream
  }
  