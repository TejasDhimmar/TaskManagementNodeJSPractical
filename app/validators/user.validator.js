const { response } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

const UserValidators = () => [
    check('name', 'Please enter name').not().isEmpty(),
    check('email', 'Please enter email').not().isEmpty().isEmail().withMessage('Enter valid email')
]

const user = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return response(res, 403, {}, errorMessages);
    }
    next();
}

module.exports = {
    user: [
        UserValidators(),
        user
    ]
}