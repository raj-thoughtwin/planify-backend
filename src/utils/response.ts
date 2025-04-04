import { Response } from 'express';

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully',
  TASKS_FETCHED: 'Task fetched successfully',
  TASK_UPDATED: 'Task status updated successfully',
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
} as const;

export const ERROR_MESSAGES = {
  MISSING_FIELDS: 'Missing required fields',
  TASK_NOT_FOUND: 'Task not found',
  SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Not authorized to access this route',
  INVALID_CREDENTIALS: 'Invalid credentials',
} as const;

interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: STATUS_CODES,
  success: boolean,
  message: string,
  data?: any,
  error?: any
): void => {
  const response: ResponseData = {
    success,
    message,
  };

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error instanceof Error ? error.message : error;
  }

  res.status(statusCode).json(response);
}; 