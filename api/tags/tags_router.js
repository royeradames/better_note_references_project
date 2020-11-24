//init express router
const router = require("express").Router()

//import tags_model
const Tags = require("./tags_model")

//import dependencies
const {body, validationResult} = require ("express-validator")

// return all tags
router.get("/", async (req, res, next) => {
    try {
       //get all tags from db
       const tags = await Tags.get_all_tags() 

       //return tags
       res.status(200).json(tags)
    } catch (error) {
       next(error) 
    }
})

module.exports = router