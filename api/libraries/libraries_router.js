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
    res.status(200).json(req.library)
})

router.get("/findlibrarybyname/:name", [
    param('name')
        .isAlpha().withMessage('Name must be letters.')
        ,   
], handle_fail_valitions, check_db, (req, res) => {
    //return library data
    res.status(200).json(req.library)
})

router.post('/', [
    body('name')
        .notEmpty()
        .matches(/^[a-z]+( [a-z]+)*$/)
        .withMessage('Name can only be one or more alphabetic words in all lowercase')
    ,
    body('description')
        .optional()
        .matches(/^[a-zA-Z_.,0-9"'-]+( [a-zA-Z_.,0-9"'-]+)*$/i)
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
], handle_fail_valitions, no_duplicates, async (req, res) => {
    // collect all validated inputs
    let new_library_data = {}
    //inputs
    const is_name = req.body.name
    const is_description = req.body.description
    const is_tag_name = req.body.tag_name
    const is_link = req.body.link
    //if the value was given then add it to the new_library_data package
    if (is_name) new_library_data.name = req.body.name
    if (is_description) new_library_data.description = req.body.description
    if (is_tag_name) new_library_data.tag_name = req.body.tag_name
    if (is_link) new_library_data.link = req.body.link

    //add valid inputs to the database
    const new_library = (await Libraries.new_library(new_library_data))[0]
    //return a response saying that it was successful
    // says "created"
    res.status(200).json({new_library})
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
async function no_duplicates(req, res, next){
        //body name must not be found
        //don't allow duplicates,
        const new_library_name = req.body.name
        const library_name = await Libraries.find_by_name(new_library_name)
        const library_name_found = library_name.length
        if(library_name_found){
            // if you can find the library name on the db then don't allow that new library 
            return res.status(406).json('library already exists')
        }
        else{
            next()
        }   
}
async function check_db(req, res, next){
    try {
        //params check id
        const id = req.params.id
        const is_id_input = id
        if(is_id_input){
            const library = (await Libraries.find_by_id(id))[0]
            const library_found = library
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