import { Request, Response } from 'express';
import models from '../../models';
import { httpStatusCodes } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { LocationAttributes } from 'models/locations';

class Location {
    /* 
        --------------------------------------------------------------------------------
        Location functions 
    */

    /**
     * @api {get} /v1/location/list-locations/:skip/:limit (List All Locations)
     * @apiName listLocations
     * @apiGroup AdminLocations
     *
     *
     * @apiSuccess {Object} Locations.
     */
    async listLocations(req: Request, res: Response) {
        logger.info('!!!!!!listLocations function start!!!!!');
        try {
            const locationData: LocationAttributes = await models.locations.findAll({
                where: {
                    _deleted: false
                },
            },);

            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: locationData
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
     *  @api {post} /v1/location/add-location
     *  @apiName addLocation
     *  @apiGroup Location
     *
     *  @apiSuccess {Object} Location
     */
    async addLocation(req: Request, res: Response) {
        logger.info('!!!!!!AddLocation function start!!!!!');
        try {
            const LocationAttributes = req.body;

            const location: LocationAttributes = await models.locations.create(LocationAttributes);

            if (location) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'Location added successfully!', data: location });
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
     *  @api {post} /v1/location/update-location
     *  @apiName updateLocation
     *  @apiGroup Location
     *
     *  @apiSuccess {Object} Location
     */
    async updateLocation(req: Request, res: Response) {
        logger.info('!!!!!!UpdateLocation function start!!!!!');
        try {
            const LocationAttributes = req.body;
            const id = req.query.id;

            const location: LocationAttributes = await models.locations.update(LocationAttributes, {
                where: { id: id }
            });

            if (location) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'City Updated successfully!', data: location });
            }
        } catch (error: any) {
            console.log(`UpdateCity error ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        } 
    }

    /**
     *  @api {post} /v1/location/delete-location
     *  @apiName deleteLocation
     *  @apiGroup Location
     *
     *  @apiSuccess {Object} Location
     */
    async deleteLocation(req: Request, res: Response) {
        logger.info('!!!!!!DeleteLocation function start!!!!!');
        try {
            const id = req.query.id;

            const location: LocationAttributes = await models.locations.update(
                {
                    _deleted: true
                },
                {
                    where: { id: id }
                }
            );

            if (location) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'Location deleted successfully!', data: location });
            }
        } catch (error: any) {
            console.log(`delete location error ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        }
    }
}

export default new Location();
