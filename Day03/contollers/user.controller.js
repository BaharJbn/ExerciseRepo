//const router = require('express').Router();
const {createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersOfProvinceById, getUsersOfProvinceByName} = require('../services/user.service')
const {PrismaClient} = require('@prisma/client');
const { userSchema } = require('../validations/validation.user');
const {user} = new PrismaClient();

// router.post('/', async (req, res) => {
//     try{
//         const result = await createUser(req.body);      
//         res.json(result);
//     }catch(err){
//         res.json(err);
//     }
//   });

   const createUserController = async(req, res) => {
        try{
                const validatedResult = await userSchema.validateAsync(req.body);
                console.log(validatedResult);
                const result = await createUser(validatedResult);      
                res.json(result);
        }catch(err){
                res.json(err.message);
        }
   }



//   router.get('/', async (req, res) => {
//     try{
//         const listOfUsers = await getAllUsers();      
//         res.json(listOfUsers);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getAllUsersController = async(req, res) => {
         try{
        const listOfUsers = await getAllUsers();      
        res.json(listOfUsers);
    }catch(err){
        res.json(err);
    }
  }


//   router.get('/:id', async (req, res) => {
//     try{
//         const currUser = await getUserById(req.params.id);     
//         res.json(currUser);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const getUserByIdController = async(req, res) => {
         try{
        const currUser = await getUserById(req.params.id);     
        res.json(currUser);
    }catch(err){
        res.json(err);
    }
  }


//   router.put('/:id', async (req, res) => {
//     try{
//         const updatedUser = await updateUser(req.params.id, req.body);      
//         res.json(updatedUser);
//     }catch(err){
//         res.json(err);
//     }
//   });

  const updateUserController = async(req,res) => {
      try{
        const updatedUser = await updateUser(req.params.id, req.body);      
        res.json(updatedUser);
    }catch(err){
        res.json(err);
    }
  }

//   router.delete("/:id", async (req , res) => {
//     try{
//         await deleteUser(req.params.id);
//         res.json("City has been deleted Successfully");
//     }catch (err){
//         res.json(err);
//     }
// });

const deleteUserController = async(req,res) => {
        try{
        await deleteUser(req.params.id);
        res.json("City has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
}

/************************************************  GET Users by provinceId *************************************************/

// router.get("/byprovince/:provinceId", async (req , res) => {
//     try{
//         const userListWithSameProvince = await getUsersOfProvinceById(req.params.provinceId);     
//         res.json(userListWithSameProvince);
//     }catch(err){
//         res.json(err)
//     }
// });

const getUsersOfProvinceByIdContoller = async(req,res) => {
        try{
        const userListWithSameProvince = await getUsersOfProvinceById(req.params.provinceId);     
        res.json(userListWithSameProvince);
    }catch(err){
        res.json(err)
    }
}

  /************************************************  GET Users by province Name *************************************************/

//   router.get("/search/:provinceName", async (req , res) => {
//     try{
//         const userListWithSameProvince = await getUsersOfProvinceByName(req.params.provinceName);     
//         res.json(userListWithSameProvince);
//     }catch(err){
//         res.json(err)
//     }
// });

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