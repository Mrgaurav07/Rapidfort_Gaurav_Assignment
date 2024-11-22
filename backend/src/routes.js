const express = require("express");
const multer = require("multer");
const convertDocxToText = require("./utils/docxToText");
const generatePdf = require("./utils/textToPdf");
const extractMetadata = require("./utils/metadata");


const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert DOCX to text
    const textContent = await convertDocxToText(file.path);

    // Generate PDF
    const pdfPath = await generatePdf(textContent);

    // Extract metadata
    const metadata = await extractMetadata(file.path);

    // Respond with success
    res.json({
      message: "File uploaded and converted successfully",
      metadata,
      pdfUrl: pdfPath,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing file", details: error.message });
  }
});

module.exports = router;
