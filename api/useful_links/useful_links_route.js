// init express router
const router = require("express").Router()

// import Useful_links_model
const Useful_links = require("./useful_links_model")
const {get_all_tags} = require("../tags/tags_model")
// import back-end validation tools
const { body, param, validationResult} = require ("express-validator")

// return all useful_links
router.get("/", async (req, res, next) => {
    try {
        // get all links on db
       const all_useful_links = await Useful_links.get_all()

       const is_have_links = all_useful_links.length
       if(is_have_links){
           //return all links on 
           res.status(200).json(all_useful_links)
       }
       else{
           res.status(404).json("no links")
       }
    } catch (error) {
        next(error)
    }
})

// get link by id
router.get("/:id", [
    param("id")
        .isInt().withMessage("ID must be an integer")
        ,
], handle_fail_valitions, async (req, res, next) => {
    try {
        //get link from db
       const useful_link = (await Useful_links.get_by_id(req.params.id))
       if(useful_link){
           res.status(200).json(useful_link)
       }
       else{
           res.status(404).json("Link not found")
       }
    } catch (error) {
        next(error)
        
    }
})

// get link by name
router.get("/name/:name", [
    param("name")
        .matches(/^[a-zA-aZ_.,0-9?|\-<>()\/]+( [a-zA-Z\/_.,0-9?|\-<>()]+)*$/i).withMessage("Name can have have upper and lower case words, -, |, ., <, >, ?, (, ), / , (commads), _, and numbers ")
], handle_fail_valitions , async (req, res, next) => {
    try {
        //get link by name from db
        const link = (await Useful_links.get_by_name(req.params.name))        

        if(link) {
            //resp with link
            res.status(200).json(link)
        }
        else{
            res.status(404).json("No link found")
        }
    } catch (error) {
        next(error)
    }
})
//create new useful link
router.post("/new_link", [
    body('name')
        .matches(/^[a-zA-aZ_.,0-9?|\-<>()\/]+( [a-zA-Z\/_.,0-9?|\-<>()]+)*$/i).withMessage("can only have upper and lower case words, -, |, ., <, >, ?, (, ), / , (commads), _, and numbers ")
        ,
    body("description")
        .optional()
        .matches(/^[a-zA-Z_.,0-9"'-]+( [a-zA-Z_.,0-9"'-]+)*$/i)
        .withMessage("can only have letters, numbers, periods, dashes, single and double quotes.")
        ,
    body("url")
        .isURL().withMessage("must be an URL")
        ,
    body("tag_name")
        .custom( async value => {
            // given tag name must be one of the tag from the tags table 
            const is_in = (await get_all_tags(true)).includes(value) 
            if(is_in){
                return true
            }
            throw new Error("not found")
        })
        
        ,
], handle_fail_valitions, async (req, res, next) => {
    try {
        //construct new link data 
        //must have data
        const link_data = {
        name: req.body.name,
        url: req.body.url,
        tag_name: req.body.tag_name,
        } 
        //add additional data if it's given
        if(req.body.description) link_data.description = req.body.description 
        
        //create new link, and store its data on var
        const new_link = await Useful_links.new_resource(link_data) 

        // resp with new like data
        res.status(200).json({new_link})
    } catch (error) {
        next(error)
        
    }
})
//local middleware
function handle_fail_valitions(req, res, next){
    // handle fail validations
    const errors = validationResult(req)
    
    // if there is only one error take it out of the array
    let error_list = errors.array()
    if(error_list.length == 1) error_list = error_list[0] 
    
    // resp with list of errors
    const is_errors = !errors.isEmpty()
    if (is_errors) return res.status(404).json(error_list)

    //no fail validation, then go to the next middleware
    next()
}

module.exports = router