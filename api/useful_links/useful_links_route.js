// init express router
const router = require("express").Router()

// import Useful_links_model
const Useful_links = require("./useful_links_model")

// return all useful_links
router.get("/", async (req, res, next) => {
    try {
        // get all links on db
       const all_useful_links = await Useful_links.get_all_useful_links()

        //return all links on 
        res.status(200).json(all_useful_links)
    } catch (error) {
        next(error)
        
    }
})

module.exports = router