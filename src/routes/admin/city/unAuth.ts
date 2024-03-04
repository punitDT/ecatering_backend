import { Router, IRouter } from 'express';
import city from '../../../controllers/admin/city';
const router: IRouter = Router();

// list cities
router.get('/list-cities/:skip?/:limit?', city.listCities);

// add cities
router.post('/add-city', city.addCity);

// update cities
router.put('/update-city/:id', city.updateCity);

// delete cities
router.delete('/delete-city/:id', city.deleteCity);

export default router;
