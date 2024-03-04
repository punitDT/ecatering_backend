import userRoute from './admin/user/unAuth';
import cusinRoute from './admin/cusin/unAuth';
import categoryRoute from './admin/category/unAuth';
import { Router } from 'express';
const router = Router();

/**
 * Total UnAuth Routes
 */
router.use('/user', userRoute);
router.use('/admin', categoryRoute);
router.use('/admin', cusinRoute);

export default router;
