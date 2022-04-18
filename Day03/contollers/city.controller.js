const router = require('express').Router();
const {createCity, getAllCities, getCityById, updateCity, deleteCity} = require('../services/city.service')


router.post('/', async (req, res) => {
    try{
        const result = await createCity(req.body);      
        res.json(result);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/', async (req, res) => {
    try{
        const listOfCities = await getAllCities();      
        res.json(listOfCities);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/:id', async (req, res) => {
    try{
        const currCity = await getCityById(req.params.id);     
        res.json(currCity);
    }catch(err){
        res.json(err);
    }
  });


  router.put('/:id', async (req, res) => {
    try{
        const updatedCity = await updateCity(req.params.id, req.body);      
        res.json(updatedCity);
    }catch(err){
        res.json(err);
    }
  });

  router.delete("/:id", async (req , res) => {
    try{
        await deleteCity(req.params.id);
        res.json("City has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
});




  module.exports = router;