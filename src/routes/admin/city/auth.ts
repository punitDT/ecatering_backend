import { Router, IRouter } from 'express';
import city from '../../../controllers/admin/city';
const router: IRouter = Router();

// list cities
router.get('/list-cities/:skip?/:limit?', city.listCities);

// list cities
router.get('/add-city', city.addCity);

export default router;
