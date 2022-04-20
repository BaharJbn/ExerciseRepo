
const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.string().alphanum(),
    gender: Joi.string().valid('MALE','FEMALE','NONE'),
    cityId: Joi.string().required()
})


module.exports = {userSchema}