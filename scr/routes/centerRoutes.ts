import { Router } from 'express';

import { getCenters, createCenter, getCenterById, getFieldsByCenter, updateCenter, deleteCenter } from '../controllers/centerController';

const router = Router();

router.get('/', getCenters);
router.get('/:id', getCenterById);
router.get('/fields/:id', getFieldsByCenter);
router.post('/', createCenter);
router.put('/', updateCenter);
router.delete('/delete/:id', deleteCenter);

export default router;