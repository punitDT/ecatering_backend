
import categoryRoute from './admin/category/unAuth';
import userRoute from './admin/user/auth';
import { Router } from 'express';
const router = Router();

/**
 * Total Auth Routes
 */
router.use('/user', userRoute);
router.use('/admin',categoryRoute);

export default router;
