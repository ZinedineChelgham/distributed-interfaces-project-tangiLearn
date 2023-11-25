import bcrypt from "bcrypt";

/**
 * Hash password with bcrypt
 * @param password {string} - The password to hash.
 * @returns {Promise<string>}
 */
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

/**
 * Compare password with hash
 * @param password {string} - The password to compare.
 * @param hash {string} - The previously stored hash to compare with.
 * @returns {Promise<boolean>} - True if password matches hash, false otherwise.
 */
export const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
