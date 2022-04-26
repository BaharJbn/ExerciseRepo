//const router = require('express').Router();
const {createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersOfProvinceById, getUsersOfProvinceByName} = require('../services/user.service')
const {PrismaClient} = require('@prisma/client');
const { userSchema } = require('../validations/validation.user');
const {user, city, province} = new PrismaClient();
const ApiError = require('../errorHandling/ApiError');
const { getCityById } = require('../services/city.service');
const Joi = require('@hapi/joi');

   const createUserController = async(req, res, next ) => {
        
      const resultValidation = (Joi.object().keys({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.string().alphanum(),
    gender: Joi.string().valid('MALE','FEMALE','NONE').required(),
    cityId: Joi.string().required()
})).validate(req.body);

const { value, error } = resultValidation;

if(error) {
  next(ApiError.badRequest(error.message));
  return;
}

if(await getCityById(value.cityId)== null){
  next(ApiError.badRequest("This city does not exist."));
  return;
}
 const validatedUser = await createUser(value);
 res.status(200).send(validatedUser);

   }



  const getAllUsersController = async(req, res) => {
         try{
        const listOfUsers = await getAllUsers();      
        res.json(listOfUsers);
    }catch(err){
        res.json(err);
    }
  }


  const getUserByIdController = async(req, res) => {
         try{
        const currUser = await getUserById(req.params.id);     
        res.json(currUser);
    }catch(err){
        res.json(err);
    }
  }


  const updateUserController = async(req,res,next) => {
    
    if(await getUserById(req.params.id) == null){
      next(ApiError.notFound(`User does not exit with id: ${req.params.id}`));
      return;
    }

    //const agePattern =
    const updatedResultValidation = (Joi.object().keys({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.string().regex(/^[1-9]{1}[0-9]?$/),
    gender: Joi.string().valid('MALE','FEMALE','NONE'),
    cityId: Joi.string().required()
})).validate(req.body);

const { value, error } = updatedResultValidation;

if(error) {
  next(ApiError.badRequest(error.message));
  return;
}

if(await getCityById(value.cityId)== null){
  next(ApiError.badRequest("This city does not exist."));
  return;
}
 const validatedUpdatedUser = await updateUser(req.params.id, value);
 res.status(200).send(validatedUpdatedUser);

  }


const deleteUserController = async(req,res) => {
        try{
        await deleteUser(req.params.id);
        res.json("City has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
}


const getUsersOfProvinceByIdContoller = async(req,res) => {
        try{
        const userListWithSameProvince = await getUsersOfProvinceById(req.params.provinceId);     
        res.json(userListWithSameProvince);
    }catch(err){
        res.json(err)
    }
}


const getUsersOfProvinceByNameController = async(req,res) => {
       try{
        const userListWithSameProvince = await getUsersOfProvinceByName(req.params.provinceName);     
        res.json(userListWithSameProvince);
    }catch(err){
        res.json(err)
    }
}




  module.exports = {
      createUserController,
      getAllUsersController,
      getUserByIdController,
      updateUserController,
      deleteUserController,
      getUsersOfProvinceByIdContoller,
      getUsersOfProvinceByNameController
  };