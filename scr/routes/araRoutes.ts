import { Router } from 'express';

import { getAllAra, getAraById, addAra, updateAra, deleteAraById } from '../controllers/araController';

const router = Router();

router.get('/', getAllAra);
router.get('/:id', getAraById);
router.post('/', addAra);
router.put('/:id', updateAra);
router.delete('/delete/:id', deleteAraById);

export default router;