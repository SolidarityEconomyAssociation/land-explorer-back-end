const bcrypt = require('bcrypt');

/**
 * Takes plain string password and return encrypted password
 * @param options
 * @returns 
 */
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
}

/**
 * Generate random string for new password
 * @param length 
 * @returns 
 */
export const randomPassword = (length: number = 15) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}