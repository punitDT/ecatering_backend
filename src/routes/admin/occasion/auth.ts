import { Router, IRouter } from 'express';
import occasion from '../../../controllers/admin/occasions';
const router: IRouter = Router();

// list occasion
router.get('/occasion', occasion.listOccasions);

// add occasion
router.post('/occasion', occasion.addOccasion);

// update occasion
router.put('/occasion', occasion.updateOccasion);

// delete occasion
router.delete('/occasion', occasion.deleteOccasion);

export default router;
