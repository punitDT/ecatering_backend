import userRoute from './admin/user/unAuth';
import cityRoutes from './admin/city/unAuth';
import locationRoutes from './admin/location/unAuth';
import occasionRoutes from './admin/occasion/unAuth';

import { Router } from 'express';
const router = Router();

/**
 * Total UnAuth Routes
 */
router.use('/user', userRoute);

router.use('/city', cityRoutes);

router.use('/location', locationRoutes);

router.use('/occasion', occasionRoutes);




export default router;
