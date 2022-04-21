const {createCity, getAllCities, getCityById, updateCity, deleteCity} = require('../services/city.service');
const { citySchema } = require('../validations/validation.city');
const { PrismaClient } = require('@prisma/client');
const { provinceSchema } = require('../validations/validation.province');
const {  city, province } = new PrismaClient();


  const createCityController = async (req,res) => {
      try{
          const result = await citySchema.validateAsync(req.body);
          console.log(result);
          const doesExist = await city.findFirst({where:
              {
                  name: result.name,
              }}) 
      if(doesExist){
          throw Error("This city already exist in system");
      }
      const provExist = await province.findFirst({where:{
          id: req.body.provinceId
      }})
    if(!provExist){
          throw Error("The province chosen for city, does not exit");
      }
        const result2 = await createCity(result);      
        res.json(result2);
    }catch(err){
        if(err.message == "This city already exist in system") {res.status(403);}
        if(err.message == "The province chosen for city, does not exit") {res.status(403);}
        res.json(err.message);
    }
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


    const deleteCityController = async (req, res) => {
            try{
        await deleteCity(req.params.id);
        res.json("City has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
    }



  module.exports = {
      createCityController,
      getAllCitiesController,
      getCityByIdController,
      updateCityController,
      deleteCityController,
  };