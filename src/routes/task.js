import express from 'express';
import { createTask, getTasks, getSingleTask, updateTask, deleteTask } from '../controllers/TaskController.js'
import { protect } from '../middleware/auth.js';
import { body, query, param, validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });
  next();
};

// post - create task
router.post('/', protect, [
    body('title').notEmpty().withMessage('Title is required'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium or High'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Done']).withMessage('Status must be Pending, In Progress or Done')
], validate, createTask);

// get - all tasks
router.get('/', protect, [
    query('status').optional().isIn(['Pending', 'In Progress', 'Done']),
    query('priority').optional().isIn(['Low', 'Medium', 'High']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('sort').optional().isString()
], validate, getTasks);

// get - single task
router.get('/:id', protect, [param('id').isMongoId().withMessage('Invalid id')], validate, getSingleTask);

//put - update task
router.put('/:id', protect, [
    param('id').isMongoId().withMessage('Invalid id'),
    body('title').optional().notEmpty(),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('status').optional().isIn(['Pending', 'In Progress', 'Done'])
], validate, updateTask);

// delete task
router.delete('/:id', protect, [param('id').isMongoId().withMessage('Invalid id')], validate, deleteTask);

export default router;
