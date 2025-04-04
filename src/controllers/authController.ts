import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SUCCESS_MESSAGES } from "../constants/successMessages";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { sendResponse } from "../utils/helpers/responseHandler";
import { UserRole } from "../utils/enums/role.enums";
import { hashPassword, verifyPassword } from "../utils/helpers/encrypt-decrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        false,
        ERROR_MESSAGES.USER_EXISTS
      );
    }

    // Hash the password once during registration
    const hashedPassword = await hashPassword(password);
    console.log("Stored hashed password:", hashedPassword);

    const newUser: any = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      SUCCESS_MESSAGES.USER_REGISTERED,
      {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      }
    );
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      ERROR_MESSAGES.SERVER_ERROR,
      error
    );
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(
        res,
        STATUS_CODES.UNAUTHORIZED,
        false,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    console.log(user)
    const isMatch = await verifyPassword(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return sendResponse(
        res,
        STATUS_CODES.UNAUTHORIZED,
        false,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return sendResponse(
      res,
      STATUS_CODES.OK,
      true,
      SUCCESS_MESSAGES.LOGIN_SUCCESS,
      { token }
    );
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      ERROR_MESSAGES.SERVER_ERROR,
      error
    );
  }
};
