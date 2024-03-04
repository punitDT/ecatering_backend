import models from './../../models';
import { httpStatusCodes } from '../../utils/constants';
import { Request,Response } from 'express';
import { Cusins } from '../../models/cusins';
import { logger } from '../../utils/logger';
class Cusin{
    constructor(){}


    async postCuisn(req:Request,res:Response) {
        try{  
        
            const cusinData : Cusins = req.body;
            const  newcategory  = await models.cusins;
            const category : Cusins = await newcategory.create(cusinData);
            res.json({
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully created',
                data: category 
            });
        
            return;
        }catch(error:any){
            logger.error(error);
                    res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                        status: httpStatusCodes.SERVER_ERROR_CODE,
                        message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
                    });
        
                    return;
        }
        }
        
        
        async getAllCusin(req:Request,res:Response)  {
        
            try{
                logger.info('Getting all categories');
                const  newcategory  = await models.cusins;
                const cusin : Cusins = await newcategory.findAll(
                    {
                        where: {
                            _deleted: false
                        },
                
                    }
                );
        
                logger.info('Call all categories');
                res.json({
                    status: httpStatusCodes.SUCCESS_CODE,
                    message: 'successfully listed',
                    data: cusin,
                });
        
                return;
                
            }catch(error: any){
                logger.error(`Error getting all categories ${error}`);
                logger.error(error);
                res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                    status: httpStatusCodes.SERVER_ERROR_CODE,
                    message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
                });
        
                return;
            }
        
        }
        
        
        async updateCusin(req:Request,res:Response) {
            try{
            
                const categorydata : Cusins = req.body;
            const id = req.query.id;
            const  newcategory  = await models.cusins;
                const category : Cusins = await newcategory.update(categorydata,{
                    where: {id},
                });
                res.json({
                    status: httpStatusCodes.SUCCESS_CODE,
                    message: 'Updated Category',
                });
            
                return;
            }catch(error:any){
                logger.error(error);
                        res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                            status: httpStatusCodes.SERVER_ERROR_CODE,
                            message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
                        });
            
                        return;
            }
            }
        
            async deleteCusin(req:Request,res:Response) {
                try{
                
                    const categorydata : Cusins = req.body;
                const id = req.query.id;
                const  newcategory  = await models.cusins;
                    const category : Cusins = await newcategory.update({
                        _deleted :true,
                    } , {
                    where: {id},
                    });
        
        
                    res.json({
                        status: httpStatusCodes.SUCCESS_CODE,
                        message: 'Deleted Category Sucessfully',
                    });
                
                    return;
                }catch(error:any){
                    logger.error(error);
                            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                                status: httpStatusCodes.SERVER_ERROR_CODE,
                                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
                            });
                
                            return;
                }
                }
            }
        
        



export  = new Cusin();