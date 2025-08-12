// Run this script to generate secure secrets for your .env file
// Usage: node scripts/generate-secrets.js

const crypto = require('crypto');

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, length);
}

console.log('=== Secure Secrets Generator ===\n');
console.log('NEXTAUTH_SECRET:', generateSecret(32));
console.log('JWT_SECRET:', generateSecret(32));
console.log('\nCopy these values to your .env file.');
console.log('Make sure to keep them secure and never commit them to version control!');
