const crypto = require("crypto");
require("dotenv").config();
const key = process.env.secretKey;

function generateLicense(userId) {
  const hash = crypto.createHmac("sha256", key).update(userId).digest("hex");
  return hash;
}

function validateLicense(userId, licenseKey) {
  const expectedLicenseKey = generateLicense(userId);
  return licenseKey === expectedLicenseKey;
}

module.exports = { generateLicense, validateLicense };
