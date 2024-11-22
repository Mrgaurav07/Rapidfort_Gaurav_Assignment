const fs = require("fs");
const { promisify } = require("util");
const PDFDocument = require("pdfkit");

const writeFile = promisify(fs.writeFile);

async function generatePdf(text) {
  const pdfPath = `uploads/output-${Date.now()}.pdf`;
  const pdfDoc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);

  pdfDoc.pipe(writeStream);
  pdfDoc.text(text);
  pdfDoc.end();

  await new Promise((resolve) => writeStream.on("finish", resolve));
  return pdfPath;
}

module.exports = generatePdf;
