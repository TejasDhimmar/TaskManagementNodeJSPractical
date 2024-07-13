const { response } = require('../utils/restResponse');
const { check, validationResult } = require('express-validator');

const taskValidators = () => [
    check('title', 'Please enter title').not().isEmpty(),
    check('description', 'Please enter description').not().isEmpty(),
    check('status', 'Please enter status').not().isEmpty(),
    check('projectId', 'Please enter projectid').not().isEmpty()
]

const task = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return response(res, 403, {}, errorMessages);
    }
    next();
}

module.exports = {
    task: [
        taskValidators(),
        task
    ]
}