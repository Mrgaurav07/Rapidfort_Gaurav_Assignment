const fs = require("fs").promises;

async function extractMetadata(filePath) {
  const stats = await fs.stat(filePath);
  return {
    originalName: filePath.split("/").pop(),
    size: stats.size,
    createdAt: stats.birthtime,
  };
}

module.exports = extractMetadata;
