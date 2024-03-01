import { Request, Response } from "express";
import models from "models";
import { CityAttributes } from "models/cities";
import { httpStatusCodes } from "utils/constants";
import { logger } from "utils/logger";


class City {

    /* 
        --------------------------------------------------------------------------------
        City functions 
    */

    /**
     * @api {get} /v1/auth/city/list-cities/:skip/:limit (List All Cities)
     * @apiName listCities
     * @apiGroup AdminCity
     *
     *
     * @apiSuccess {Object} City.
     */
    async listCities(req: Request, res: Response) {
        logger.info('!!!!!!listCities function start!!!!!');
        try {
            const cityData: CityAttributes = await models.cities.findAll();

            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: cityData
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
     *  @api {post} /v1/auth/city/add-city
     *  @apiName addCity
     *  @apiGroup City
     *
     *  @apiSuccess {Object} City
     */
    async addCity(req: Request, res: Response) { 
        logger.info('!!!!!!AddCity function start!!!!!');
        try {
           
            const CityAttributes = req.body;

            const city: CityAttributes = models.cities.create(CityAttributes); 
            
            if (city) {
                res.json({ status: httpStatusCodes.SUCCESS_CODE, message: 'City adeed successfully!', data: city });
            }
        } catch (error: any) {
            console.log(`add cityerror ${error}`);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });
        }
    }

}

export default new City();