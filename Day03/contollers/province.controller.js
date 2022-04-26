//const router = require('express').Router();
const Joi = require('@hapi/joi');

const {createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince, checkProvinceAlreadyExist} = require('../services/province.service')
const { provinceSchema} = require('../validations/validation.province')
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../errorHandling/ApiError');
const ApiResponse = require('../responseHandling/ApiResponse');
const {  province } = new PrismaClient();


  const createProvinceController = async(req, res, next) => {

    const result = (Joi.object().keys({ 
    name: Joi.string().min(2).max(100).required(), 
    area: Joi.number().min(1).max(2000).required() 
  })).validate(req.body);

  const { value, error } = result; 
  if (error) {
    next(ApiError.badRequest(error.message));
    return;


  }  if(await checkProvinceAlreadyExist(value.name)){
      next(ApiError.badRequest("This province already exist. Please try another entry!"));
      return;
  }
  else { 
    const createdProvince = await createProvince(value);   
    //next(ApiResponse.posted(value));
    res.status(201).send(createdProvince);
  } 
  }



  const getAllProvincesController = async(req, res) => {
        try{
        const listOfProvinces = await getAllProvinces();      
        res.json(listOfProvinces);
    }catch(err){
        res.json(err);
    }
  }


  const getProvinceByIdController = async(req, res) => {
        try{
        const currProvince = await getProvinceById(req.params.id);      
        res.json(currProvince);
    }catch(err){
        res.json(err);
    }
  }


  const updateProvinceController = async(req, res, next) => {

  if(await getProvinceById(req.params.id) == null){
      next(ApiError.notFound(`province does not exit with id: ${req.params.id}`));
      return;
    }
  const updateResult = (Joi.object().keys({ 
    name: Joi.string().min(2).max(100).required(), 
    area: Joi.number().min(1).max(2000).required() 
  })).validate(req.body);

  const { value, error } = updateResult; 

  

  const doesExist = await province.findFirst({where:
          {
            name: value.name,
            id: {
              not: req.params.id,
            }
          }
          
        }) 
          if(doesExist){
                  next(ApiError.badRequest("Updated province name already exist. Please try another entry!"));
                  return;
          }

    const updatedProvince = await updateProvince(req.params.id, value);      
              res.status(200).send(updatedProvince);
  }



  const deleteProvinceController = async(req, res, next) => {

    if(await getProvinceById(req.params.id) == null){
      next(ApiError.badRequest("Province does not exist in database!"));
      return;
    }
    else{
      await deleteProvince(req.params.id);
      res.status(200).send("Province has been deleted Successfully");
    }
  }



module.exports = {
    createProvinceController,
    getAllProvincesController,
    getProvinceByIdController,
    updateProvinceController,
    deleteProvinceController,
}