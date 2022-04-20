
const Joi = require('@hapi/joi');

const citySchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).required(),
    provinceId: Joi.string().required(),
})


module.exports = {citySchema}