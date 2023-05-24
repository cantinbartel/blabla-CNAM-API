import { Router } from 'express';

import { getAllFields, getFieldById, addField, updateField, deleteFieldById } from '../controllers/fieldController';

const router = Router();

router.get('/', getAllFields);
router.get('/:id', getFieldById);
router.post('/', addField);
router.put('/:id', updateField);
router.delete('/delete/:id', deleteFieldById);

export default router;