const {createCity, getAllCities, getCityById, updateCity, deleteCity, existCityByName} = require('../services/city.service');
const { citySchema } = require('../validations/validation.city');
const { PrismaClient } = require('@prisma/client');
const { provinceSchema } = require('../validations/validation.province');
const {  city, province } = new PrismaClient();
const Joi = require('@hapi/joi')
const ApiError = require('../errorHandling/ApiError');
const { getProvinceById } = require('../services/province.service');



  const createCityController = async (req,res,next) => {
    const result = Joi.object({
            name: Joi.string().alphanum().min(2).max(50).required(),
            provinceId: Joi.string().required(),
            }).validate(req.body);
  const { value, error } = result; 
  if (error) {
    next(ApiError.badRequest(error.message));
    return;
  }


  if (await getProvinceById(value.provinceId)==null){
    next(ApiError.badRequest("Province does not exist with the id that you entered.Try again!"));
    return;
  }

  if (await existCityByName(value.name)){
    next(ApiError.badRequest("This city already exist"));
    return;
  }

  const finalResult = await createCity(value);      
  res.json(finalResult);
      //       const doesExist = await city.findFirst({where:
      //         {
      //             name: result.name,
      //         }}) 
      // if(doesExist){
      //     throw Error("This city already exist in system");
      // }



    //   try{
    //       const result = await Joi.object({
    //         name: Joi.string().alphanum().min(2).max(50).required(),
    //         provinceId: Joi.string().required(),
    //         }).validateAsync(req.body);
    //       console.log(result);
    //       const doesExist = await city.findFirst({where:
    //           {
    //               name: result.name,
    //           }}) 
    //   if(doesExist){
    //       throw Error("This city already exist in system");
    //   }
    //   const provExist = await province.findFirst({where:{
    //       id: req.body.provinceId
    //   }})
    // if(!provExist){
    //       throw Error("The province chosen for city, does not exit");
    //   }
    //     const result2 = await createCity(result);      
    //     res.json(result2);
    // }catch(err){
    //     if(err.message == "This city already exist in system") {res.status(403);}
    //     if(err.message == "The province chosen for city, does not exit") {res.status(403);}
    //     res.json(err.message);
    // }
  }

  const getAllCitiesController = async(req,res) => {
         try{
        const listOfCities = await getAllCities();      
        res.json(listOfCities);
    }catch(err){
        res.json(err);
    }
  }


  const getCityByIdController = async(req,res) => {
    try{
        const currCity = await getCityById(req.params.id); 
        if (!currCity){
            res.json(`There is no city with id: ${req.params.id} in the list`);
        }else{    
        res.json(currCity);
        }
    }catch(err){
        res.json(err);
    }
  }


  const updateCityController = async (req,res) => {
    try{
        const validatedCity = await citySchema.validateAsync(req.body);
        console.log(validatedCity);

        const provExist = await province.findFirst({where:{
          id: req.body.provinceId
        }})
        if(!provExist){
          throw Error("The province chosen for city, does not exit");
        }

        const updatedCity = await updateCity(req.params.id, validatedCity);      
        res.json(updatedCity);
    }catch(err){
        if (err.message == "The province chosen for city, does not exit") res.status(403);
        res.json(err.message);
    }
  }


    const deleteCityController = async (req, res, next) => {

    if(await getCityById(req.params.id) == null){
      next(ApiError.badRequest("City does not exist to be deleted!"));
      return;
    }
    else{
      await deleteCity(req.params.id);
      res.status(200).send("City has been deleted Successfully");
    }
    //         try{
    //     await deleteCity(req.params.id);
    //     res.json("City has been deleted Successfully");
    // }catch (err){
    //     res.json(err);
    // }
    }



  module.exports = {
      createCityController,
      getAllCitiesController,
      getCityByIdController,
      updateCityController,
      deleteCityController,
  };