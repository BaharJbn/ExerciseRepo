const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || "3000";


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


  /************************************************ CRUD FOR USER *************************************************/

  app.post('/user', async (req, res) => {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  });
  
  app.get("/user", async (req , res) => {
      const user = await prisma.user.findMany();
      res.json(user);
  });

  app.put("/user", async (req , res) => {
    const {id, name, age, gender, cityId} = req.body;
    const updatedUser = await prisma.city.update({
        where: {
            id: id
        },
        data: {
            name: name,
            age: age,
            gender: gender,
            cityId: cityId
        }
    });
    res.json(updatedUser);
});

app.delete("/user/:id", async (req , res) => {
    const id = req.params.id;
    const deletedUser = await prisma.city.delete({
        where: {
            id: id,
        },
    });
    res.json(deletedUser);
});



/************************************************ CRUD FOR PROVINCE*************************************************/

app.post('/province', async (req, res) => {
  const province = await prisma.province.create({ data: req.body });
  res.json(province);
});

app.get("/province", async (req , res) => {
    const provinces = await prisma.province.findMany();
    res.json(provinces);
});

app.put("/province", async (req , res) => {
    const {id, name, area} = req.body;
    const updatedProvince = await prisma.province.update({
        where: {
            id: id
        },
        data: {
            name: name,
            area: area
        }
    });
    res.json(updatedProvince);
});

app.delete("/province/:id", async (req , res) => {
    const id = req.params.id;
    const deletedProvince = await prisma.province.delete({
        where: {
            id: id,
        },
    });
    res.json(deletedProvince);
});

/************************************************ CRUD FOR CITY *************************************************/

app.post('/city', async (req, res) => {
    const city = await prisma.city.create({ data: req.body });
    res.json(city);
  });
  
  app.get("/city", async (req , res) => {
      const city = await prisma.city.findMany();
      res.json(city);
  });
  
  app.put("/city", async (req , res) => {
      const {id, name, provinceId} = req.body;
      const updatedCity = await prisma.city.update({
          where: {
              id: id
          },
          data: {
              name: name,
              provinceId: provinceId
          }
      });
      res.json(updatedCity);
  });
  
  app.delete("/city/:id", async (req , res) => {
      const id = req.params.id;
      const deletedCity = await prisma.city.delete({
          where: {
              id: id,
          },
      });
      res.json(deletedCity);
  });


app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});