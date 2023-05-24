import { Router } from 'express';

import {
    getCenters,
    createCenter,
    getCenterById
} from '../controllers/center';

const router = Router();

router.get('/', getCenters);
router.get('/:id', getCenterById);
router.post('/', createCenter);
// router.post('/', addTask);
// router.get('/:id', getTaskById);
// router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);
// router.get('/:userId/user', getTaskByUserId);

export default router;