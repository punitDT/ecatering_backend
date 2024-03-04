import { Router, IRouter } from 'express';
import occasion from '../../../controllers/admin/occasions';
const router: IRouter = Router();

// list occasion
router.get('/list-occasions/:skip?/:limit?', occasion.listOccasions);

// add occasion
router.post('/add-occasion', occasion.addOccasion);

// update occasion
router.put('/update-occasion/:id', occasion.updateOccasion);

// delete occasion
router.delete('/delete-occasion/:id', occasion.deleteOccasion);

export default router;
