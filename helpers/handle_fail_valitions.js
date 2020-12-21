const {validationResult} = require("express-validator")

module.exports = (req, res, next) => {
    // handle fail validations
    const errors = validationResult(req)
    
    // if there is only one error take it out of the array
    let error_list = errors.array()
    if(error_list.length == 1) error_list = error_list[0] 
    
    // resp with list of errors
    const is_errors = !errors.isEmpty()
    if (is_errors) return res.status(404).json(error_list)

    //no fail validation, then go to the next middleware
    next()
}