const router = require('express').Router();
const {createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince} = require('../services/province.service')


router.post('/', async (req, res) => {
    try{
        const addNewProvince = await createProvince(req.body);      
        res.json(addNewProvince);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/', async (req, res) => {
    try{
        const listOfProvinces = await getAllProvinces();      
        res.json(listOfProvinces);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/:id', async (req, res) => {
    try{
        const currProvince = await getProvinceById(req.params.id);      
        res.json(currProvince);
    }catch(err){
        res.json(err);
    }
  });


  router.put('/:id', async (req, res) => {
    try{
        const updatedProvince = await updateProvince(req.params.id, req.body);      
        res.json(updatedProvince);
    }catch(err){
        res.json(err);
    }
  });

  router.delete("/:id", async (req , res) => {
    try{
        await deleteProvince(req.params.id);
        res.json("Province has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
});




  module.exports = router;