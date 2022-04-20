//const router = require('express').Router();
const {createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince} = require('../services/province.service')
const { provinceSchema} = require('../validations/validation.province')
const { PrismaClient } = require('@prisma/client');
const {  province } = new PrismaClient();

// router.post('/', async (req, res) => {
//     try{
//         const addNewProvince = await createProvince(req.body);      
//         res.json(addNewProvince);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const createProvinceController = async(req, res) => {
    try{
      const result = await provinceSchema.validateAsync(req.body);
      console.log(result);
      const doesExist = await province.findUnique({where:
      {
        name: result.name,
      }}) 
      if(doesExist){
          throw Error("This Province already exist in system");
      }
        const addNewProvince = await createProvince(result);      
        res.json(addNewProvince);
    }catch(err){
      if(err.message == "This Province already exist in system") res.status(403);
        res.json(err.message);
    }
  }


//   router.get('/', async (req, res) => {
//     try{
//         const listOfProvinces = await getAllProvinces();      
//         res.json(listOfProvinces);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getAllProvincesController = async(req, res) => {
        try{
        const listOfProvinces = await getAllProvinces();      
        res.json(listOfProvinces);
    }catch(err){
        res.json(err);
    }
  }


//   router.get('/:id', async (req, res) => {
//     try{
//         const currProvince = await getProvinceById(req.params.id);      
//         res.json(currProvince);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getProvinceByIdController = async(req, res) => {
        try{
        const currProvince = await getProvinceById(req.params.id);      
        res.json(currProvince);
    }catch(err){
        res.json(err);
    }
  }

//   router.put('/:id', async (req, res) => {
//     try{
//         const updatedProvince = await updateProvince(req.params.id, req.body);      
//         res.json(updatedProvince);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const updateProvinceController = async(req, res) => {
   try{
        const updatedProvince = await updateProvince(req.params.id, req.body);      
        res.json(updatedProvince);
    }catch(err){
        res.json(err);
    }
  }

//   router.delete("/:id", async (req , res) => {
//     try{
//         await deleteProvince(req.params.id);
//         res.json("Province has been deleted Successfully");
//     }catch (err){
//         res.json(err);
//     }
// });

  const deleteProvinceController = async(req, res) => {
    try{
        await deleteProvince(req.params.id);
        res.json("Province has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
  }




//   module.exports = router;

module.exports = {
    createProvinceController,
    getAllProvincesController,
    getProvinceByIdController,
    updateProvinceController,
    deleteProvinceController,
}