import { logger } from '../../utils/logger';
import models from '../../models';
import { UserAttributes } from '../../models/users';
import { Request, Response } from 'express';
import { httpStatusCodes } from '../../utils/constants';
class User {
    constructor() {
        // super();
    }

    /* 
        --------------------------------------------------------------------------------
        Admins functions 
    */

    /**
     * @api {get} /v1/auth/list-user/:skip/:limit (List All Role User)
     * @apiName listUsers
     * @apiGroup AdminUser
     *
     *
     * @apiSuccess {Object} User.
     */
    async listUsers(req: Request, res: Response) {
        logger.info('!!!!!!listUsers function start!!!!!');
        try {
            const userData: UserAttributes = await models.users.findOne({
                where: {
                    _deleted: false
                },
                include: [
                    {
                        model: models.user_roles,
                        as: 'userRole'
                    }
                ]
            });

            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: userData
            });

            return;
        } catch (error: any) {
            logger.error(error);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });

            return;
        }
    }

    /**
     *  @api {post} /v1/user/signin
     *  @apiName SignInUser
     *  @apiGroup Users
     *
     *  @apiSuccess {Object} User
     */
    async register(req: Request, res: Response) { 
        try {

            console.log('Signing in');
           
            const UserAttributes = req.body;

            const user: UserAttributes = models.users.create(UserAttributes); 
            
            console.log(`user after signin ${user}`); 

            if (user) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'User  created successfully!', data: user });
            }
        } catch (error: any) {
            console.log(`user after signin ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        }
    }
}

export default new User();
 