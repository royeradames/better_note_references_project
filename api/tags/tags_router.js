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

       const is_tags_here = tags.length
       if(is_tags_here){
           //return tags
           res.status(200).json(tags)
       }
       else{
           //if there is no tags, say so
           res.status(404).json("No tags exists.")
       }
    } catch (error) {
       next(error) 
    }
})

module.exports = router