import { Router, IRouter } from 'express';
import location from '../../../controllers/admin/location';
const router: IRouter = Router();

// list locations
router.get('/location', location.listLocations);

// add location
router.post('/location', location.addLocation);

// update location
router.put('/location', location.updateLocation);

// delete location
router.delete('/location', location.deleteLocation);

export default router;
