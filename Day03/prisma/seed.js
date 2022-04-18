import faker from '@faker-js/faker';
import pkg from '@prisma/client';
const {PrismaClient} = pkg;

//================ ??????????  IMPORT DID NOT WORK FROM USER   ???????????   =================
//import { seedUser } from './seedFolder/seedUser.js';




 /**************  **************  ************** MAIN FUNCTION **************  **************  **************/

const prisma = new PrismaClient(); 

 async function main() { 

   // seedUser();

   // *************************** Temporary way to get unique province name ******************
    // for(let i=0; i < 2 ; i++){
    //     let flag = true;
    //     let newProvinceName = ""
    //     while(flag){
    //     newProvinceName = faker.address.state();
    //     console.log(newProvinceName);
    //     const existProvinceName = await prisma.province.findUnique({
    //         where: {
    //             name: newProvinceName
    //         }
    //     })
    //     if(!existProvinceName){
    //         flag = false;

    //     }
    // }
    //     await prisma.province.create({
    //         data: {
    //             name: newProvinceName,                  
    //             area: faker.datatype.number(100)
    //         }
    //     })

    // }

    //************************************** SEED City *************************************/

    // Solution 01 for having unique city name
    // for(let i=0; i < 2 ; i++){
    //     let flag = true;
    //     let newCityName = ""
    //     while(flag){
    //         newCityName = faker.address.city();
    //     console.log(newProvinceName);
    //     const existCityName = await prisma.city.findUnique({
    //         where: {
    //             name: newCityName
    //         }
    //     })
    //     if(!existCityName){
    //         flag = false;

    //     }
    // }


    // Solution 02 for having unique city name
    const cityList = await prisma.city.findMany({
        select: {
            name: true,
        }
    });
    //console.log(cityList);


    var arrayOfCityName = [];

    cityList.forEach(element => {
        arrayOfCityName.push(element.name);
    });
    console.log(arrayOfCityName);






    // Getting Provinces Id
    const listOfProvinces = await prisma.province.findMany({
        select: {
            id: true,
        }
    });
    console.log(listOfProvinces);


    var arrayOfProvinceId = [];

    listOfProvinces.forEach(element => {
        arrayOfProvinceId.push(element.id);
    });
    console.log(arrayOfProvinceId);


    for (let i=0; i<5; i++){

        let flag = true;
        let newCityName = ""
        while(flag){
            newCityName = faker.address.city();
        console.log(newCityName);
        if (!arrayOfCityName.includes(newCityName)){
            flag = false;
        }
    }


                await prisma.city.create({
            data: {
                name:`${faker.address.city()}`,
                provinceId: arrayOfProvinceId[Math.floor(Math.random()*arrayOfProvinceId.length)]          //provinceId: province.id
            }
        })
    }


        //************************************** SEED User *************************************/


    //     const listOfCities = await prisma.city.findMany({
    //         select: {
    //             id: true,
    //         }
    //     });
    //     console.log(listOfCities);
    
    
    //     var arrayOfCityId = [];
    
    //     listOfCities.forEach(element => {
    //         arrayOfCityId.push(element.id);
    //     });
    //     console.log(arrayOfCityId);
        
    //     const arrayOfGender = ["FEMALE", "MALE", "NONE"]
    
    //     for (let i=0; i<5; i++){
    //                 await prisma.user.create({
    //             data: {
    //                 name:`${faker.name.findName()}`,
    //                 age: faker.datatype.number(100).toString(),
    //                 gender: arrayOfGender[Math.floor(Math.random()*arrayOfGender.length)] , 
    //                 cityId: arrayOfCityId[Math.floor(Math.random()*arrayOfCityId.length)]          //provinceId: province.id
    //             }
    //         })
    // }
 }
  main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})


