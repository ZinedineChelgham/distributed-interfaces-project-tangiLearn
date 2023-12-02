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

export class PipeGameAction {
  /**
   * @param {"move" | "rotate"} type - The type of action. Note that a player can rotate a pipe and move it at the same time.
   * @param {0|1|2|3} pipeType - The type of pipe to move. 0 = straight, 1 = elbow, 2 = t-shape, 3 = big.
   * @param {{x:number,y:number}} position - The final position of the pipe after the player has released it.
   * @param {0|90|180|270} rotation - The final rotation of the pipe after the player has released it.
   */
  constructor(type, pipeType, position, rotation) {
    this.type = type;
    this.pipeType = pipeType;
    this.position = position;
    this.rotation = rotation;
  }
}
