import { Request, Response } from 'express';
import models from '../../models';
import { httpStatusCodes } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { OccasionAttributes } from 'models/occasions';

class Occasions {
    /* 
        --------------------------------------------------------------------------------
        Occasions functions 
    */

    /**
     * @api {get} /v1/occasions/list-occasions/:skip/:limit (List All Occasions)
     * @apiName listOccasions
     * @apiGroup AdminOccasions
     *
     *
     * @apiSuccess {Object} Occasions.
     */
    async listOccasions(req: Request, res: Response) {
        logger.info('!!!!!!listOccasions function start!!!!!');
        try {
            const occasionsData: OccasionAttributes = await models.occasions.findAll({
                where: {
                    _deleted: false
                }
            });

            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: occasionsData
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
     *  @api {post} /v1/occasion/add-occasion
     *  @apiName addOccasion
     *  @apiGroup Occasion
     *
     *  @apiSuccess {Object} Occasion
     */
    async addOccasion(req: Request, res: Response) {
        logger.info('!!!!!!AddOccasion function start!!!!!');
        try {
            const OccasionAttributes = req.body;

            const occasion: OccasionAttributes = await models.occasions.create(OccasionAttributes);

            if (occasion) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'Occasionation added successfully!', data: occasion });
            }
        } catch (error: any) {
            console.log(`add location error ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        }
    }

    /**
     *  @api {post} /v1/occasion/update-occasion
     *  @apiName updateOccasion
     *  @apiGroup Occasion
     *
     *  @apiSuccess {Object} Occasion
     */
    async updateOccasion(req: Request, res: Response) {
        logger.info('!!!!!!UpdateOccasion function start!!!!!');
        try { 
            const OccasionAttributes = req.body;
            const id = req.query.id;

            const occasion: OccasionAttributes = await models.occasions.update(OccasionAttributes, {
                where: { id: id }, 
            });

            if (occasion) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'Occasion Updated successfully!', data: occasion });
            }
        } catch (error: any) {
            console.log(`UpdateOccasion error ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        } 
    }

    /**
     *  @api {post} /v1/occasion/delete-occasion
     *  @apiName deleteOccasion
     *  @apiGroup Occasion
     *
     *  @apiSuccess {Object} Occasion
     */
    async deleteOccasion(req: Request, res: Response) {
        logger.info('!!!!!!DeleteOccasion function start!!!!!');
        try {
            const id = req.query.id;

            const occasion: OccasionAttributes = await models.occasions.update(
                {
                    _deleted: true
                },
                {
                    where: { id: id }
                }
            );

            if (occasion) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'Occasion deleted successfully!', data: occasion });
            }
        } catch (error: any) {
            console.log(`delete occasion error ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        }
    }
}

export default new Occasions();
