import express from 'express';
import { protect } from '../middleware/auth';
import { createTask, getTasks, updateTaskStatus } from '../controllers/taskController';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Create a new issue
router.post('/', createTask);

// Get all issues
router.get('/', getTasks);

// Update issue status
router.patch('/:id/status', updateTaskStatus);

export default router; 