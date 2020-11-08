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
router.get("/:id", check_id, async (req, res, next) => {
    res.status(200).json({library: req.library})
})
router.get("/findlibrarybyname/:name", check_name, async (req, res) => {
    res.status(200).json({library: req.library_name})
})

//local middleware
async function check_id(req, res, next){
    try {
        const id = req.params.id
        const library = await Libraries.find_by_id(id)
        
        const library_found = library.length
        if (library_found) {
            req.library = library
            next()
        } else {
            res.status(404).json({error: "Invalid ID"})
        }
    } catch (error) {
        next(error)
    }
}

async function check_name(req, res, next){
    try {
        const name = req.params.name
        const library_name = await Libraries.find_by_name(name)

        const library_name_found = library_name.length
        
        if (library_name_found) {
            req.library_name = library_name
            next()
        } else {
            res.status(404).json({error: "name not found"})            
        }
    } catch (error) {
        next(error)
    }
}
module.exports = router