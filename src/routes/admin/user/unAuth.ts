import { Router, IRouter } from 'express';
import user from '../../../controllers/admin/user';
const router: IRouter = Router();

// users table
router.get('/list/:skip/:limit', user.listUsers);

router.post('/register',user.userRegister);

export default router;
