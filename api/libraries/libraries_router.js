//init express router
const router = require("express").Router()

//import libraries_model
const Libraries = require("./libraries_model")

//import dependencies
const { check, validationResult } = require('express-validator')

router.get("/", async (req, res, next) => {
    try {

        const libraries = await Libraries.get_all_libraries()
        
        res.status(200).json({libraries})
    } catch (error) {
        next(error)
    }
})
router.post("/:id", check_id, async (req, res, next) => {
    res.status(200).json({library: req.library})
})
// router.post("/:name", async () => {

// })

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

module.exports = router