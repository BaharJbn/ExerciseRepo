import faker from '@faker-js/faker';
import pkg from '@prisma/client';
const {PrismaClient} = pkg;

 /**************  **************  ************** MAIN FUNCTION **************  **************  **************/

const prisma = new PrismaClient(); 

 const seedUser = async () => { 

            //************************************** SEED User *************************************/


            const listOfCities = await prisma.city.findMany({
                select: {
                    id: true,
                }
            });
            console.log(listOfCities);
        
            // const allProvincesId = prisma.province.findMany({
            //     select: {
            //         id: true,
            //     }
            // })
            // console.log(allProvincesId.);
        
            var arrayOfCityId = [];
        
            listOfCities.forEach(element => {
                arrayOfCityId.push(element.id);
            });
            console.log(arrayOfCityId);
            
            const arrayOfGender = ["FEMALE", "MALE", "NONE"]
        
            for (let i=0; i<5; i++){
                        await prisma.user.create({
                    data: {
                        name:`${faker.name.findName()}`,
                        age: faker.datatype.number(100).toString(),
                        gender: arrayOfGender[Math.floor(Math.random()*arrayOfGender.length)] , 
                        cityId: arrayOfCityId[Math.floor(Math.random()*arrayOfCityId.length)]          //provinceId: province.id
                    }
                })
            }

} 
module.exports = seedUser;
