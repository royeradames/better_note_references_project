// init express router
const router = require("express").Router()

// import Useful_links_model
const Useful_links = require("./useful_links_model")

// import back-end validation tools
const {body, param, validationResult} = require ("express-validator")

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
       const useful_link = (await Useful_links.by_id(req.params.id))[0]
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
router.post("/name", [
    body("name")
        .matches(/^[a-zA-aZ_.,0-9?|\-<>()\/]+( [a-zA-Z\/_.,0-9?|\-<>()]+)*$/i).withMessage("Name can have have upper and lower case words, -, |, ., <, >, ?, (, ), / , (commads), _, and numbers ")
], handle_fail_valitions , async (req, res, next) => {
    try {
        //get link by name from db
        const link = (await Useful_links.by_name(req.body.name))[0]        

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