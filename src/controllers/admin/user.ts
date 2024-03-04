import { UserAttributes } from './../../models/users';
import { logger } from '../../utils/logger';
import models from '../../models';
import { Request, Response } from 'express';
import { httpStatusCodes } from '../../utils/constants';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
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
            const userData: UserAttributes = await models.user.findOne({
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


    async userRegister(req : Request,res: Response) {
        console.log('CALL API');
        
        try{
            const userData: UserAttributes = req.body;
            const createUser = await models.users.create(userData);  
            const token = jwt.sign({ userId: createUser.id , role : 'admin',}, 'your_secret_key',);
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully registered',
                data: {
                    user: userData,
                    token : token, 
                },
            });

            return;

        } catch(error:any){
            logger.error(`Error in registering the user ${error}`);
            logger.error(error);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });

            return;
        }
    }
}

export default new User();
