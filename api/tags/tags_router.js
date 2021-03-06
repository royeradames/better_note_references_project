//init express router
const router = require("express").Router()

//import tags_model
const Tags = require("./tags_model")

//import validation checker
const {body, validationResult, query} = require ("express-validator")
const validator = require("validator")


// return all tags  
router.get("/", [
    query("limit")
        .isInt({min:1, max: 100}).withMessage("must be a whole number from 1 to 100")
        .optional()
        ,
    query("order")
        .isIn(["asc", "desc", "ASC", "DESC"]).withMessage("must be asc or desc")
        .optional()
        ,
    query("offset")
        .isInt().withMessage("must be a integer")
        .optional()
        ,
    query("avoid")
        .optional()
        .custom( values => {
                
            // convert the inputs into js
            let avoid_array_int 
            try {
                avoid_array_int = JSON.parse(values)
            } catch {
                throw new Error("not a valid query input")
            } 

            // check that there is an array
            const is_not_array = !Array.isArray(avoid_array_int)
            if(is_not_array) throw new Error("must be an array")

            //check that the array only has integers 
            let array_has_non_alphas =  false
            
            avoid_array_int.forEach(value => {
                
                const is_not_alpha = !validator.isAlpha(value)
                // check all avoid list values for them being integers
                if(is_not_alpha) array_has_non_alphas = true
            })
            if (array_has_non_alphas) throw new Error('must only contain alphabet letters')

            // every is has expected
            return true
        })
        ,
], handle_fail_valitions, async (req, res, next) => {
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