//init express router
const router = require("express").Router()

//import libraries_model
const Libraries = require("./libraries_model")

//import dependencies
const { param, body, validationResult } = require('express-validator')

router.get("/", async (req, res, next) => {
    try {
        //get all libraries on the database
        const libraries = await Libraries.get_all_libraries()
        
        //if there is liraries data, give them to the client
        // else tell the client that their is no data
        const is_libraries_found = libraries.length
        if(is_libraries_found){
            res.status(200).json(libraries)
        }else{
            res.status(404).json({error: "No libraries at this moment"})
        }
    } catch (error) {
        next(error)
    }
})

router.get("/:id", [
    param('id')
        .isInt().withMessage('Id must be an integer')
        ,
    ], handle_fail_valitions, check_db, async (req, res, next) => {

    //return library
    res.status(200).json({library: req.library})
})

router.get("/findlibrarybyname/:name", [
    param('name')
        .isAlpha().withMessage('Name must be letters.')
        ,   
], handle_fail_valitions, check_db, (req, res) => {
    //return library data
    res.status(200).json({library: req.library_name})
})

router.post('/', [
    body('name')
        .notEmpty()
        .matches(/^[a-z]+( [a-z]+)*$/)
        .withMessage('Name can only be one or more alphabetic words in all lowercase')
    ,
    body('description')
        .optional()
        .matches(/-|\.|"|'|\w+/gmi)
        .withMessage("Can only have letters, numbers, periods, dashes, single and double quotes.")
    ,
    body('tag_name')
        .notEmpty()
        .isAlpha()
    ,
    body('link')
        .optional()
        .isURL()
    ,
], handle_fail_valitions, check_db, async (req, res) => {
    //don't allow duplicates,
    // if you can find the library name on the db then don't allow that new library

    //add valid inputs to the database

    //return a response saying that it was successful
    // says "created"
    res.status(200).json('success')
})
//local middleware
function handle_fail_valitions(req, res, next){
    // handle fail validations
    const errors = validationResult(req)
    const is_errors = !errors.isEmpty()
    if (is_errors) return res.status(404).json(errors.array())

    //no fail validation, then go to the next middleware
    next()
}
async function check_db(req, res, next){
    try {
        //body name must not be found
        const new_library_name = req.body.name
        const library_name = await Libraries.find_by_name(new_library_name)
        const library_name_found = library_name.length
        if(library_name_found){
            return res.status(406).json('library already exists')
        }
        else{
            next()
        }

        //params check id
        const id = req.params.id
        const is_id_input = id
        if(is_id_input){
            const library = await Libraries.find_by_id(id)
            const library_found = library.length
            if (library_found) {
                req.library = library
                next()
            } else {
                res.status(404).json({error: "Invalid ID"})
            }
        }

        //params check name
        const name = req.params.name 
        if(name){
            const library_name = await Libraries.find_by_name(name)
            const library_name_found = library_name.length
            
            if (library_name_found) {
                req.library_name = library_name
                next()
            } else {
                return res.status(404).json({error: "name not found"})            
            }
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports = router