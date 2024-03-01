import { Router, IRouter } from 'express';
import user from '../../../controllers/admin/user';
import { route } from 'app';
const router: IRouter = Router();

// users table
router.get('/list/:skip/:limit', user.listUsers);

router.post('/register', user.register);

export default router;
