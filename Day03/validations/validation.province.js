const Joi = require('@hapi/joi');
const { PrismaClient } = require('@prisma/client');
const {  province } = new PrismaClient();

const provinceSchema = Joi.object({
    name: Joi.string().alphanum().lowercase().
          external(async (value) => {
        const provinceNameExist = await province.findFirst({where:{ name: value }});

        if (provinceNameExist !== null) {
          throw new Error('province already exists');
        }
      }).
    required(),
    area: Joi.number().integer().min(1).max(600000).required()
})


module.exports = {provinceSchema}