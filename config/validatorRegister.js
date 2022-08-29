const joi = require('joi')

const validatorRegister = (req, res, next) => {
    const schema = joi.object({
        name: joi.string()
        .min(4)
        .required()
        .messages({'string.min': 'Name: min 4 characters'}),
        lastName: joi.string()
        .min(4)
        
        .messages({'string.min': 'LastName: min 3 characters'}),
        email: joi.string()
            .email({minDomainSegments: 2})
            .required()
            .messages({'string.email': 'Email: incorrect format'}),
        password: joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': 'password: min 8 characters',
                'string.max': 'password: max 30 characters'
            }),
        from: joi.string()
            .required()
        
    })

    const validation = schema.validate(req.body.userData, {abortEarly:false})
    if(validation.error){
        return res.json({success: false, from: 'validator', message: validation.error.details, test:validation})
    }
    next()
}

module.exports = validatorRegister