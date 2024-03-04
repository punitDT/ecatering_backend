import category from '../../../controllers/admin/cusine';
import {  IRouter, Router } from "express";

const router: IRouter = Router();


// users table
router.get('/cusin',category.getAllCusin); // get all categories

router.post('/cusin', category.postCuisn);  // post categories

router.put('/cusin', category.updateCusin);  // update categories

router.delete('/cuisn', category.deleteCusin); // delete categories


export default router;