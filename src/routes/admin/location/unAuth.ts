import { Router, IRouter } from 'express';
import location from '../../../controllers/admin/location';
const router: IRouter = Router();

// list locations
router.get('/list-locations/:skip?/:limit?', location.listLocations);

// add location
router.post('/add-location', location.addLocation);

// update location
router.put('/update-location/:id', location.updateLocation);

// delete location
router.delete('/delete-location/:id', location.deleteLocation);

export default router;
