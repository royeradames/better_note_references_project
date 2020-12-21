//init express router
const router = require("express").Router()

//import tags_model
const Tags = require("./tags_model")

//import validation checker
const {body, validationResult} = require ("express-validator")

// return all tags  
router.get("/", async (req, res, next) => {
    try {
        //gather all query options
        // default values does not affect selecting libraries
        const options = {
            limit:  req.query.limit || 10, //defaults values after ||
            order: req.query.order || "asc",
            avoid: req.query.avoid || JSON.stringify([0]),
        }

        // if there is no options selected, resp with all libraries
       const is_get_all = req.query.limit ||  req.query.order || req.query.avoid ? false: true

       //get all tags from db
       const tags = await Tags.get_all_tags(is_get_all, options) 

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

// create new tag
router.post("/newtag", [
    body("name")
        .isAlpha().withMessage("Tag name must be letters")
        ,
], handle_fail_valitions, async (req, res, next) => {
    try {
        // create new tag on db
        const new_tag = (await Tags.post_new_tag(req.body.name))[0] 

        //return new create tag to the client
        res.status(200).json({new_tag: new_tag.name})
    } catch (error) {
        next(error)
        
    }
})

//local middleware
function handle_fail_valitions(req, res, next){
    // handle fail validations
    const errors = validationResult(req)
    const is_errors = !errors.isEmpty()
    if (is_errors) return res.status(404).json(errors.array()[0])

    //no fail validation, then go to the next middleware
    next()
}
module.exports = router