import crypto from 'crypto';

export default function hashPassword(password) {
  // Generate a random salt (recommended 16 bytes for scrypt)
  const salt = crypto.randomBytes(16).toString('hex');

  // Use scrypt to derive a key (hash) from the password and salt
  // Parameters: password, salt, keylen (derived key length in bytes), options (cost parameters)
  // The '64' here is the key length in bytes.
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  // Return both salt and hash for storage in your database
  return { hash, salt };
}
