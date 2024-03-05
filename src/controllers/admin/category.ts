import { CategoryAttributes } from './../../models/categories';
import models from '../../models';
import { Response, Request } from 'express';
import { httpStatusCodes } from '../../utils/constants';
import { logger } from '../../utils/logger';

class Category {
    constructor() {}

    async postCategory(req: Request, res: Response) {
        try {
            const categorydata: CategoryAttributes = req.body;
            const newcategory = await models.categories;
            const category: CategoryAttributes = await newcategory.create(categorydata);
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully created',
                data: category
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

    async getAllCategory(req: Request, res: Response) {
        try {
            logger.info('Getting all categories');
            const newcategory = await models.categories;
            const category: CategoryAttributes = await newcategory.findAll({
                where: {
                    _deleted: false
                }
            });
                
            logger.info('Call all categories');
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: category
            });
        
            return;
        } catch (error: any) {
            logger.error(`Error getting all categories ${error}`);
            logger.error(error);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });

            return;
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const categorydata: CategoryAttributes = req.body;
            const id = req.query.id;
            const newcategory = await models.categories;
            const category: CategoryAttributes = await newcategory.update(categorydata, {
                where: { id }
            });
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'Updated Category'
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

    async deleteCategory(req: Request, res: Response) {
        try {
            const categorydata: CategoryAttributes = req.body;
            const id = req.query.id;
            const newcategory = await models.categories;
            const category: CategoryAttributes = await newcategory.update(
                {
                    _deleted: true
                },
                {
                    where: { id }
                }
            );
    
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'Deleted Category Sucessfully'
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
}

export = new Category();
