import cityRoutes from './admin/city/auth';
import userRoute from './admin/user/unAuth';
import { Router } from 'express';
const router = Router();

/**
 * Total UnAuth Routes
 */
router.use('/user', userRoute);

router.use('/city', cityRoutes);

export default router;
