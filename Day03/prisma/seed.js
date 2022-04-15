import faker from '@faker-js/faker';
import pkg from '@prisma/client';
const {PrismaClient} = pkg;

 /**************  **************  ************** MAIN FUNCTION **************  **************  **************/

const prisma = new PrismaClient(); 

 async function main() { 
    for(let i=0; i < 2 ; i++){
        await prisma.province.create({
            data: {
                name:`${faker.address.state()}`,
                area: faker.datatype.number(100)
            }
        })
    //const province =  prisma.province.create({ data: req.body });
    //res.json(province);
    //console.log("done!")
    }

    // const listOfProvinceId = prisma.province.findMany({
    //     select:{
    //         id: true
    //     },
    // })
    
    // for(item in listOfProvinceId){
    //     const newItem = JSON.stringify(item);
    //     console.log(newItem);
    // }

    // console.log((await listOfProvinceId).toString);
    // const listOfId = (await listOfProvince).findIndex.random
    

    // for(let i=0; i < 5 ; i++){
    //     await prisma.city.create({
    //         data: {
    //             name:`${faker.address.city()}`,
    //             province: create {
    //                 SELECT * FROM province 
    //             }             //provinceId: province.id
    //         }
    //     })
    // //const province =  prisma.province.create({ data: req.body });
    // //res.json(province);
    // //console.log("done!")
    // }
  }
  main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})


