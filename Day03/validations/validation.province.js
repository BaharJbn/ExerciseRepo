const Joi = require('@hapi/joi');

const provinceSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    area: Joi.number().integer().min(1).max(600000).required()
})


module.exports = {provinceSchema}