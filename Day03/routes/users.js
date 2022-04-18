const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { user, city, province } = new PrismaClient();



//   /************************************************ CRUD FOR USER *************************************************/

  router.post('/', async (req, res) => {
    const newUser = await user.create({ data: req.body });
    res.json(newUser);
  });
  
  router.get("/", async (req , res) => {
      const listOfUsers = await user.findMany();
      res.json(listOfUsers);
  });

  router.put("/", async (req , res) => {
    const {id, name, age, gender, cityId} = req.body;
    const updatedUser = await user.update({
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

router.delete("/:id", async (req , res) => {
    const id = req.params.id;
    const deletedUser = await user.delete({
        where: {
            id: id,
        },
    });
    res.json(deletedUser);
});

/************************************************  GET Users by provinceId *************************************************/

  router.get("/:provinceId", async (req , res) => {
    const provinceId = req.params.provinceId;
    const userList = await user.findMany({
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
    res.json(userList);
});

  /************************************************  GET Users by province Name *************************************************/

  router.get("/search/:provinceName", async (req , res) => {
    const provinceName = req.params.provinceName;
    const userList = await user.findMany({
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
    res.json(userList);
});

module.exports = router