// init express router
const router = require("express").Router()

// import Useful_links_model
const Useful_links = require("./useful_links_model")

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
router.get("/:id", async (req, res, next) => {
    try {
        //get link from db
       const useful_link = (await Useful_links.by_id(req.params.id))[0]
       res.status(200).json(useful_link)
    } catch (error) {
        next(error)
        
    }
})
module.exports = router