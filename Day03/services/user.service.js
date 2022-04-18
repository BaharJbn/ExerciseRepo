const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const {  user, city, province } = new PrismaClient();


const createUser = async (newUserDetails) => {
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
    const newUser = await user.create({ data: newUserDetails });
    console.log(newUser);
    return newUser;
}


const getAllUsers = async (listOfUsers) => {

    listOfUsers = await user.findMany();
    return listOfUsers;
}


const getUserById = async (userId, currUser) => {

    currUser = await user.findUnique({
        where: {
            id: userId
        }
    });
    return currUser;
}

const updateUser = async (userId, updatedUser) => {
    //const { name, age, gender} = updatedCity;
    updatedUser = await user.update({
        where: {
            id: userId
        },
        data: {
            name: updatedUser.name,
            age: updatedUser.age,
            gender: updatedUser.gender,
            cityId: updatedUser.cityId
        }
    });
    return updatedUser;
}


const deleteUser = async (userId, deletedUser) => {

    deletedUser = await user.delete({
        where: {
            id: userId
        }
    });
    return deletedUser;
}

/************************************************  GET Users by provinceId *************************************************/

const getUsersOfProvinceById = async (provinceId, listOfUsersByProvinceId) => {
    //const provinceId = req.params.provinceId;
    listOfUsersByProvinceId = await user.findMany({
            where: {
            city: {
                    province: {
                            id: {
                                equals: provinceId,
                            }
                        }
                    }
                }
    });
    return listOfUsersByProvinceId;
}

  /************************************************  GET Users by province Name *************************************************/

  const getUsersOfProvinceByName = async (provinceName, listOfUsersByProvinceName) => {
    //const provinceName = req.params.provinceName;
    listOfUsersByProvinceName = await user.findMany({
            where: {
            city: {
                    province: {
                            name: {
                                equals: provinceName,
                            }
                        }
                    }
                }
    });
    return listOfUsersByProvinceName;
}





module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersOfProvinceById, getUsersOfProvinceByName};