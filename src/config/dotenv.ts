import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  db: {
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
  },
  jwtSecret: process.env.JWT_SECRET as string,
  HASH: {
    SALT: 10,
    ROUNDS: 16,
  },
};
