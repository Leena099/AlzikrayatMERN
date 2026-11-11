const joi = require('joi');

const register = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    location: joi.string().allow(''),
    description: joi.string().allow(''),
    occupation: joi.string().allow('')
});

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    next();
};

module.exports = {register, login, validate};