import bcrypt from "bcryptjs";
import { config } from '../../config/dotenv';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

/**
 * @param password
 * @returns
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(config.HASH.SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * @param password
 * @param hashedPassword
 * @returns
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.PASSWORD_VERIFY_ERROR);
  }
};
