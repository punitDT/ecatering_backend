import { Router, IRouter } from 'express';
import city from '../../../controllers/admin/city';
const router: IRouter = Router();

// list cities
router.get('/city', city.listCities);

// add cities
router.post('/city', city.addCity);

// update cities
router.put('/city', city.updateCity);

// delete cities
router.delete('/city', city.deleteCity);

export default router;
