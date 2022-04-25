const express = require("express");
const { faker, Faker } = require('@faker-js/faker');
const apiErrorHandler = require('./errorHandling/api-error-handler');


const app = express();

app.use(express.json());

app.use('/api/provinces', require('./routes/provinces'))
app.use('/api/cities', require('./routes/cities'))
app.use('/api/users', require('./routes/users'))

//app.use('/api/users', require('./routes/users'))


const port = process.env.PORT || "3000";


// const { PrismaClient } = require('@prisma/client');
// const { json } = require("express/lib/response");
// const prisma = new PrismaClient();


//   /************************************************ CRUD FOR USER *************************************************/

//   app.post('/user', async (req, res) => {
//     const user = await prisma.user.create({ data: req.body });
//     res.json(user);
//   });
  
//   app.get("/user", async (req , res) => {
//       const user = await prisma.user.findMany();
//       res.json(user);
//   });

//   app.put("/user", async (req , res) => {
//     const {id, name, age, gender, cityId} = req.body;
//     const updatedUser = await prisma.city.update({
//         where: {
//             id: id
//         },
//         data: {
//             name: name,
//             age: age,
//             gender: gender,
//             cityId: cityId
//         }
//     });
//     res.json(updatedUser);
// });

// app.delete("/user/:id", async (req , res) => {
//     const id = req.params.id;
//     const deletedUser = await prisma.city.delete({
//         where: {
//             id: id,
//         },
//     });
//     res.json(deletedUser);
// });



// /************************************************ CRUD FOR PROVINCE*************************************************/


// /************************************************ CRUD FOR CITY *************************************************/



//   /************************************************  GET Users by provinceId *************************************************/

//   app.get("/user/:provinceId", async (req , res) => {
//     const provinceId = req.params.provinceId;
//     const user = await prisma.user.findMany({
//             where: {
//             city: {
//                     province: {
//                             id: {
//                                 equals: provinceId,
//                             }
//                         }
//                     }
//                 }
//     });
//     res.json(user);
// });

  /************************************************  GET Users by province Name *************************************************/

//   app.get("/user/search/:provinceName", async (req , res) => {
//     const provinceName = req.params.provinceName;
//     const user = await prisma.user.findMany({
//             where: {
//             city: {
//                     province: {
//                             name: {
//                                 equals: provinceName,
//                             }
//                         }
//                     }
//                 }
//     });
//     res.json(user);
// });

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});



