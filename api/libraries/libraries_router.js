//init express router
const router = require("express").Router()

//import libraries_model
const Libraries = require("./libraries_model")

//import dependencies
const { check, validationResult } = require('express-validator')

router.get("/", async (req, res, next) => {
    try {

        const libraries = await Libraries.get_all_libraries()
        
        const is_libraries_found = libraries.length
        if(is_libraries_found){
            res.status(200).json({libraries})
        }else{
            res.status(404).json({error: "No libraries at this moment"})
        }
    } catch (error) {
        next(error)
    }
})
router.get("/:id", check_db, async (req, res, next) => {
    res.status(200).json({library: req.library})
})
router.get("/findlibrarybyname/:name", check_db, async (req, res) => {
    res.status(200).json({library: req.library_name})
})

//local middleware
async function check_db(req, res, next){
    try {
        //check id
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

        //check name
        const name = req.params.name
        if(name){
            const library_name = await Libraries.find_by_name(name)
            const library_name_found = library_name.length
            
            if (library_name_found) {
                req.library_name = library_name
                next()
            } else {
                res.status(404).json({error: "name not found"})            
            }
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports = router