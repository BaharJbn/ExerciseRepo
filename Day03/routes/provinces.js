const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { province } = new PrismaClient();

// router.post('/province', async (req, res) => {
//     for(let i=0; i < 10; i++){
//         await province.create({
//             data: {
//                 name:`${faker.address.state()}`,
//                 area: `${Math.random().toFixed(5)}`
//             },
//         }),
//     //const province =  prisma.province.create({ data: req.body });
//     res.json(province);
//     }
// });

router.get("/", async (req , res) => {
    const provinces = await province.findMany();
    res.json(provinces);
});

router.put("/province", async (req , res) => {
    const {id, name, area} = req.body;
    const updatedProvince = await province.update({
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

router.delete("/province/:id", async (req , res) => {
    const id = req.params.id;
    const deletedProvince = await province.delete({
        where: {
            id: id,
        },
    });
    res.json(deletedProvince);
});

module.exports = router
