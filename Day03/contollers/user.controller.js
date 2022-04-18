const router = require('express').Router();
const {createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersOfProvinceById, getUsersOfProvinceByName} = require('../services/user.service')


router.post('/', async (req, res) => {
    try{
        const result = await createUser(req.body);      
        res.json(result);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/', async (req, res) => {
    try{
        const listOfUsers = await getAllUsers();      
        res.json(listOfUsers);
    }catch(err){
        res.json(err);
    }
  });


  router.get('/:id', async (req, res) => {
    try{
        const currUser = await getUserById(req.params.id);     
        res.json(currUser);
    }catch(err){
        res.json(err);
    }
  });


  router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await updateUser(req.params.id, req.body);      
        res.json(updatedUser);
    }catch(err){
        res.json(err);
    }
  });

  router.delete("/:id", async (req , res) => {
    try{
        await deleteUser(req.params.id);
        res.json("City has been deleted Successfully");
    }catch (err){
        res.json(err);
    }
});

/************************************************  GET Users by provinceId *************************************************/

router.get("/byprovince/:provinceId", async (req , res) => {
    try{
        const userListWithSameProvince = await getUsersOfProvinceById(req.params.provinceId);     
        res.json(userListWithSameProvince);
    }catch(err){
        res.json(err)
    }
});

  /************************************************  GET Users by province Name *************************************************/

  router.get("/search/:provinceName", async (req , res) => {
    try{
        const userListWithSameProvince = await getUsersOfProvinceByName(req.params.provinceName);     
        res.json(userListWithSameProvince);
    }catch(err){
        res.json(err)
    }
});




  module.exports = router;