//const router = require('express').Router();
const Joi = require('@hapi/joi');

const {createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince, checkProvinceAlreadyExist} = require('../services/province.service')
const { provinceSchema} = require('../validations/validation.province')
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../errorHandling/ApiError');
const {  province } = new PrismaClient();

// router.post('/', async (req, res) => {
//     try{
//         const addNewProvince = await createProvince(req.body);      
//         res.json(addNewProvince);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const createProvinceController = async(req, res, next) => {


      //const { body } = req;
       const result = (Joi.object().keys({ 
    name: Joi.string().min(2).max(100).required(), 
    area: Joi.number().min(1).max(2000).required() 
  })).validate(req.body);
  //const result = newProvinceSchema.validate(req.body); 
  const { value, error } = result; 
  //const valid = error == null; 
  if (error) {
    next(ApiError.badRequest(error.message));
    return;
    // res.status(400).json({ 
    //   message: "Error: " + error.message, 
    //   data: body 
    // }) 

  }  if(await checkProvinceAlreadyExist(value.name)){
      next(ApiError.badRequest("This province already exist. Please try another entry!"));
      return;
  }
  else { 
    const createdProvince = await createProvince(value); 
    
    res.status(201).send(createdProvince);
    //res.json({ message: 'ResoucreateProvincerce created', data: createdProvince }) 
    //res.json(createdProvince);
  } 

      //   const doesExist = await province.findUnique({where:
      // {
      //   name: req.body.name,
      // }}) 
      // if(doesExist){
      //     next(ApiError.badRequest("The Province name is already exist. Choose a new one"))
      //     return;
      // }
    //     try{
    //   const result = await provinceSchema.validateAsync(req.body);
    //   console.log(result);
    //   const doesExist = await province.findUnique({where:
    //   {
    //     name: result.name,
    //   }}) 
    //   if(doesExist){
    //       throw Error("This Province already exist in system");
    //   }
    //     const addNewProvince = await createProvince(result);      
    //     res.json(addNewProvince);
    // }catch(err){
    //   if(err.message == "This Province already exist in system") res.status(403);
    //     res.json(err);
    // }

  //   const result =  await provinceSchema.validateAsync(req.body).then(() =>
  //   {const addNewProvince = await createProvince(req.body);
  //   console.log(addNewProvince)
  // }    
    // res.status(200).json({
    //   status: 'success',
    //   message: 'User created successfully',
    //   data: Object.assign({ id }, value),
    // })
  // )
  // .catch((e) =>
  // next(ApiError.badRequest(e.message))
  // );
        // const addNewProvince = await createProvince(result);      
        // res.json(addNewProvince);

            //  res.json(result);
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
          const updateResult = await provinceSchema.validateAsync(req.body);
          console.log(updateResult);
          const doesExist = await province.findFirst({where:
          {
            name: updateResult.name,
            id: {
              not: req.params.id,
            }
          }
          
        }) 
          if(doesExist){
              throw Error("This Province name already exist in system");
          }
            const updatedProvince = await updateProvince(req.params.id, updateResult);      
            res.json(updatedProvince);
    }catch(err){
        if(err.message == "This Province name already exist in system") res.status(403);
        res.json(err.message);
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