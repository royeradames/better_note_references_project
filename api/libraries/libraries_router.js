//init express router
const router = require("express").Router()

//import libraries_model
const Libraries = require("./libraries_model")

//import dependencies
const { param, body } = require("express-validator")

//global middleware
const handle_fail_valitions = require("../../helpers/handle_fail_valitions")
//todo: run this router tests
router.get("/", async (req, res, next) => {
    try {
        //gather all query options
        // default values does not affect selecting libraries
        // all_libraries overwrites limit
        const options = {
            limit:  req.query.limit || 1, //defaults values after ||
            order: req.query.order || "asc",
            offset: req.query.offset || 0,
            avoid: req.query.avoid || JSON.stringify([0]),
        }

        // if there is no options selected, resp with all libraries
       const is_get_all = req.query.limit ||  req.query.order || req.query.offset || req.query.avoid? false: true

        //get all libraries on the database
        const libraries = await Libraries.get_all_libraries(is_get_all, options)
        
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
    param("id")
        .isInt().withMessage("Id must be an integer")
        ,
    ], handle_fail_valitions, check_db, async (req, res, next) => {

    //return library
    res.status(200).json(req.library)
})

router.get("/name/:name", [
    param("name")
        .isAlpha().withMessage("Name must be letters.")
        ,   
], handle_fail_valitions, check_db, (req, res) => {
    //return library data
    res.status(200).json(req.library_by_name)
})

router.post("/", [
    body("name")
        .notEmpty()
        .matches(/^[a-z]+( [a-z]+)*$/)
        .withMessage("Name can only be one or more alphabetic words in all lowercase")
    ,
    body("description")
        .optional()
        .matches(/^[a-zA-Z_.,0-9"'-]+( [a-zA-Z_.,0-9"'-]+)*$/i)
        .withMessage("Can only have letters, numbers, periods, dashes, single and double quotes.")
    ,
    body("tag_name")
        .notEmpty()
        .isAlpha()
    ,
    body("link")
        .optional()
        .isURL()
    ,
], handle_fail_valitions, no_duplicates, body_data, async (req, res) => {

    //add valid inputs to the database
    const new_library = (await Libraries.new_library(req.body_data))
    
    //return a response saying that it was successful
    // says "created"
    res.status(200).json({new_library})
})

//update library by id
router.put("/", [
    body("id")
        .isInt().withMessage("must be an integer")
        ,
    body("name")
        .notEmpty()
        .matches(/^[a-z]+( [a-z]+)*$/)
        .withMessage("can only be one or more alphabetic words in all lowercase")
    ,
    body("description")
        .optional()
        .matches(/^[a-zA-Z_.,0-9"'-]+( [a-zA-Z_.,0-9"'-]+)*$/i)
        .withMessage("Can only have letters, numbers, periods, dashes, single and double quotes.")
    ,
    body("tag_name")
        .notEmpty()
        .isAlpha().withMessage("must be alphabetic characters")
    ,
    body("link")
        .optional()
        .isURL().withMessage("must be a valid link")
    ,
], handle_fail_valitions, check_db, body_data, async (req, res, next) => {
    try {
        
        //collect all inputs
        let update_library_data = {}
        //inputs
        const is_name = req.body.name
        const is_description = req.body.description
        const is_tag_name = req.body.tag_name
        const is_link = req.body.link
        //if the value was given then add it to the update_library_data package
        if (is_name) update_library_data.name = req.body.name
        if (is_description) update_library_data.description = req.body.description
        if (is_tag_name) update_library_data.tag_name = req.body.tag_name
        if (is_link) update_library_data.link = req.body.link
        // update library on the db
        const updated_library = await Libraries.update_by_id(req.body.id, req.body_data) 

        //response with the updated library
        res.status(200).json(updated_library)
    } catch (error) {
        next(error)
    }
})
//delete library by id
router.delete("/:id", [
    param("id")
        .isInt().withMessage("must be an integer")
        ,
    ], handle_fail_valitions, check_db, async (req, res, next) => {
    
    // delete library from db
    const deleted_library = await Libraries.delete_by_id(req.params.id)
    //return library
    res.status(200).json({deleted_library: req.library})
})

//local middleware
function body_data(req, res, next){
        //collect all inputs
        let body_data = {}

        //inputs
        const is_name = req.body.name
        const is_description = req.body.description
        const is_tag_name = req.body.tag_name
        const is_link = req.body.link

        //if the value was given then add it to the update_library_data package
        if (is_name) body_data.name = req.body.name
        if (is_description) body_data.description = req.body.description
        if (is_tag_name) body_data.tag_name = req.body.tag_name
        if (is_link) body_data.link = req.body.link

        // save body data on the req for next middleware
        req.body_data = body_data

        // move to next middleware
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
            return res.status(406).json("library already exists")
        }
        else{
            next()
        }   
}
async function check_db(req, res, next){
    try {
        //check id
        const id = req.params.id || req.body.id
        const is_id_input = id
        if(is_id_input){
            // check if there is one or more libraries to find
            const libraries_found = (await Libraries.get_all_libraries()).length

            // find the library
            const library = (await Libraries.find_by_id(id))[0]
            const library_found = library
            if (library_found) {
                //library found
                req.library = library
                next()
            } 
            else if (libraries_found){
                // if there is libraries to be found and it was not
                res.status(404).json({error: "invalid ID"})
            }
            else {
                // no library to be found
                res.status(404).json("no libraries to be found")
            }
        }

        //params check name
        const name = req.params.name 
        if(name){
            const library_by_name = (await Libraries.find_by_name(name))[0]
            const library_name_found = library_by_name
            
            if (library_name_found) {
                req.library_by_name = library_by_name
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