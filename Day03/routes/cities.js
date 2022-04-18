const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { city, province } = new PrismaClient();



// router.get("/", async (req , res) => {
//     try{
//     const newCity = await city.findMany();
//     res.json(newCity);
//     } catch (err) {
//         console.log(err);
//     }
// });


// router.post('/', async (req, res) => {

//     let provinceExists = await province.findUnique({
//         where: {
//             id: req.body.provinceId
//         }
//     });

    if(!provinceExists) {
        return res.status(400).json({
            msg: "province not found"
        })
    }
    const city = await city.create({ data: req.body });
    res.json(city);
  });
  
  
  router.put("/", async (req , res) => {
      const {id, name, provinceId} = req.body;
      const updatedCity = await city.update({
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
  
  router.delete("/:id", async (req , res) => {
      const id = req.params.id;
      const deletedCity = await city.delete({
          where: {
              id: id,
          },
      });
      res.json(deletedCity);
  });

  module.exports = router