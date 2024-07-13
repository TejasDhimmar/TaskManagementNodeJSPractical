const { response } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

const projectValidators = () => [
    check('name', 'Please enter name').not().isEmpty(),
    check('description', 'Please enter description').not().isEmpty(),
    check('userId', 'Please enter userid').not().isEmpty()
]

const project = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return response(res, 403, {}, errorMessages);
    }
    next();
}

module.exports = {
    project: [
        projectValidators(),
        project
    ]
}