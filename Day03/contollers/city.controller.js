//const router = require('express').Router();
const {createCity, getAllCities, getCityById, updateCity, deleteCity} = require('../services/city.service');
const { citySchema } = require('../validations/validation.city');
const { PrismaClient } = require('@prisma/client');
const {  city } = new PrismaClient();

// router.post('/', async (req, res) => {
//     try{
//         const result = await createCity(req.body);      
//         res.json(result);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const createCityController = async (req,res) => {
      try{
          const result = await citySchema.validateAsync(req.body);
          console.log(result);
          const doesExist = await city.findUnique({where:
      {
        name: result.name,
      }}) 
      if(doesExist){
          throw Error("This city already exist in system");
      }
        const result2 = await createCity(req.body);      
        res.json(result2);
    }catch(err){
        if(err.message == "This city already exist in system") res.status(403);
        res.json(err.message);
    }
  }


//   router.get('/', async (req, res) => {
//     try{
//         const listOfCities = await getAllCities();      
//         res.json(listOfCities);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getAllCitiesController = async(req,res) => {
         try{
        const listOfCities = await getAllCities();      
        res.json(listOfCities);
    }catch(err){
        res.json(err);
    }
  }


//   router.get('/:id', async (req, res) => {
//     try{
//         const currCity = await getCityById(req.params.id);     
//         res.json(currCity);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getCityByIdController = async(req,res) => {
          try{
        const currCity = await getCityById(req.params.id);     
        res.json(currCity);
    }catch(err){
        res.json(err);
    }
  }


//   router.put('/:id', async (req, res) => {
//     try{
//         const updatedCity = await updateCity(req.params.id, req.body);      
//         res.json(updatedCity);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const updateCityController = async (req,res) => {
    try{
        const updatedCity = await updateCity(req.params.id, req.body);      
        res.json(updatedCity);
    }catch(err){
        res.json(err);
    }
  }

//   router.delete("/:id", async (req , res) => {
//     try{
//         await deleteCity(req.params.id);
//         res.json("City has been deleted Successfully");
//     }catch (err){
//         res.json(err);
//     }
// });

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