const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const {  city, province } = new PrismaClient();


const createCity = async (newCit) => {
    // let provinceExists = await province.findUnique({
    //     where: {
    //         id: newCit.provinceId
    //     }
    // });

    // if(!provinceExists) {
    //     return res.status(400).json({
    //         msg: "province not found"
    //     })
    // }
    // let cityExists = await city.findUnique({
    //     where: {
    //         name: newCit.name
    //     }
    // });

    // if(cityExists) {
    //     return res.status(400).json({
    //         msg: "This city already exist"
    //     })
    // }
    const newCity = await city.create({ data: newCit });
    console.log(newCity);
    return newCity;
}


const getAllCities = async (listOfCities) => {

    listOfCities = await city.findMany();
    return listOfCities;
}


const getCityById = async (cityId, currCity) => {

    currCity = await city.findUnique({
        where: {
            id: cityId
        }
    });
    return currCity;
}

const updateCity = async (cityId, updatedCity) => {
    //const { name, age, gender} = updatedCity;
    updatedCity = await city.update({
        where: {
            id: cityId
        },
        data: {
            name: updatedCity.name,
            provinceId: updatedCity.provinceId
        }
    });
    return updatedCity;
}


const deleteCity = async (cityId, deletedCity) => {

   // try{
    deletedCity = await city.delete({
        where: {
            id: cityId
        }
    });
    return deletedCity;
    //}catch(err){
    //    return err;
    //}
}




module.exports = {createCity, getAllCities, getCityById, updateCity, deleteCity};