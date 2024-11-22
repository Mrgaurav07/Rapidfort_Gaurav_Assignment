const fs = require("fs");
const { promisify } = require("util");
const mammoth = require("mammoth");

const readFile = promisify(fs.readFile);

async function convertDocxToText(filePath) {
  const fileBuffer = await readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  return result.value;
}

module.exports = convertDocxToText;
