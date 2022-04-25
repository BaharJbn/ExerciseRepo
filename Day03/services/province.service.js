const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const {  province } = new PrismaClient();
const ApiError = require('../errorHandling/ApiError');


const createProvince = async (newProv) => {
    // // const exists = await province.findUnique({
    // //     where: {
    // //         name: newProv.name,
    // //     }
    // // })
    // if(exists){
    //     return "Error: There is already a province with this name! try again";
    // }
    const newProvince = await province.create({ data: newProv });
    console.log(newProvince);
    return newProvince;
}



const getAllProvinces = async (listOfProvinces) => {

    listOfProvinces = await province.findMany();
    return listOfProvinces;
}


const getProvinceById = async (provinceId, currProvince) => {

    currProvince = await province.findUnique({
        where: {
            id: provinceId
        }
    });
    return currProvince;
}

const updateProvince = async (provinceId, updatedProvince) => {
    // const exists = await province.findUnique({
    //     where: {
    //         name: updateProvince.name,
    //     }
    // })
    // if(exists){
    //     return "Error: There is already a province with this name! try again";
    // }
    
    //const { name} = updatedProvince;
    updatedProvince = await province.update({
        where: {
            id: provinceId
        },
        data: {
            name: updatedProvince.name,
            area: updatedProvince.area,
        }
    });
    return updatedProvince;
}


const deleteProvince = async (provinceId, deletedProvince) => {

   // try{
    deletedProvince = await province.delete({
        where: {
            id: provinceId
        }
    });
    return deletedProvince;
    //}catch(err){
    //    return err;
    //}
}

const checkProvinceAlreadyExist = async (provinceName) => {
    existProvince = await province.findUnique({
        where: {
            name: provinceName
        }
    });
    console.log(existProvince)
    if(existProvince){
    return true;
    }
    else{
        return false;
    }
    // if(existProvince){
    //     return ApiError.badRequest("This province already exist. Please try another entry!");
    // }else{
    //     return null;
    // }
}




module.exports = {createProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince, checkProvinceAlreadyExist};