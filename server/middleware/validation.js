const joi = require('joi');

const register = joi.object({
    firstName: joi.String().required(),
    lastName: joi.String().required(),
    email: joi.String().email().required(),
    password: joi.String().min(8).required(),
    location: joi.String().allow(''),
    description: joi.String().allow(''),
    occupation: joi.String().allow('')
});

const login = joi.object({
    email: joi.String().email().required(),
    password: joi.String().required()
});

const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({message. error.details[0].message});
    next();
};

module.exports = (register, login, validate);