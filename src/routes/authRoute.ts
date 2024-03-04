
import categoryRoute from './admin/category/auth';
import userRoute from './admin/user/auth';
import { Router } from 'express';
import cusinRoute from './admin/cusine/auth';
const router = Router();

/**
 * Total Auth Routes
 */
router.use('/user', userRoute);
router.use('/admin', categoryRoute);
router.use('/admin', cusinRoute);

export default router;
