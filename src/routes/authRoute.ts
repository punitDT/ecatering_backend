import categoryRoute from './admin/category/auth';
import userRoute from './admin/user/auth';
import { Router } from 'express';
import cusinRoutes from './admin/cusine/auth';
import cityRoutes from './admin/city/auth';
import locationRoutes from './admin/location/auth';
import occasionRoutes from './admin/occasion/auth';

const router = Router();

/**
 * Total Auth Routes
 */
router.use('/user', userRoute);
router.use('/admin', categoryRoute);
router.use('/admin', cusinRoutes);
router.use('/admin', cityRoutes);
router.use('/admin', locationRoutes);
router.use('/admin', occasionRoutes);

export default router;
