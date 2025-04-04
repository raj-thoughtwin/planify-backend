import { Request, Response, RequestHandler } from 'express';
import Task, { TaskType, TaskPriority, TaskStatus } from '../models/Task';
import { sendResponse, STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/response';
import { User } from '../models/User';

export interface CreateTaskRequest extends Request {
  body: {
    title: string;
    type: TaskType;
    priority: TaskPriority;
    assignedTo: string;
    description?: string;
  };
}

export interface UpdateStatusRequest extends Request {
  params: {
    id: string;
  };
  body: {
    status: TaskStatus;
  };
}

// Create a new task
export const createTask: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, type, priority, assignedTo, description } = req.body as CreateTaskRequest['body'];
    
    // Validate required fields
    if (!title || !type || !priority || !assignedTo) {
      sendResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        false,
        ERROR_MESSAGES.MISSING_FIELDS
      );
      return;
    }

    // Generate a unique ID for the task
    const prefix = 'TASK';
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const id = `${prefix}-${randomNum}`;

    const task = await Task.create({
      id,
      title,
      type,
      priority,
      assignedTo,
      description,
      status: TaskStatus.TODO,
    });

    sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      SUCCESS_MESSAGES.TASK_CREATED,
      task
    );
  } catch (error) {
    console.error('Error creating task:', error);
    sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      ERROR_MESSAGES.SERVER_ERROR,
      undefined,
      error
    );
  }
};

// Get all tasks
export const getTasks: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'assigneeDetails', // ✅ Matches alias in association
          attributes: ['id', 'firstName', 'lastName', 'email'], // ✅ Fetch required fields
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    sendResponse(
      res,
      STATUS_CODES.OK,
      true,
      SUCCESS_MESSAGES.TASKS_FETCHED,
      tasks
    );
  } catch (error) {
    console.error('Error fetching tasks:', error);
    sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      ERROR_MESSAGES.SERVER_ERROR,
      undefined,
      error
    );
  }
};


// Update task status
export const updateTaskStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as UpdateStatusRequest['body'];

    if (!status) {
      sendResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        false,
        ERROR_MESSAGES.MISSING_FIELDS
      );
      return;
    }

    const task = await Task.findByPk(id);
    if (!task) {
      sendResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        false,
        ERROR_MESSAGES.TASK_NOT_FOUND
      );
      return;
    }

    await task.update({ status });

    sendResponse(
      res,
      STATUS_CODES.OK,
      true,
      SUCCESS_MESSAGES.TASK_UPDATED,
      task
    );
  } catch (error) {
    console.error('Error updating task status:', error);
    sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      ERROR_MESSAGES.SERVER_ERROR,
      undefined,
      error
    );
  }
};
