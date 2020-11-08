const router = require("express").Router()

const Libraries = require("./libraries_model")

router.get("/", async (req, res, next) => {
    try {
        const libraries = await Libraries.get_all_libraries()
        
        res.status(200).json({libraries})
    } catch (error) {
        next(error)
    }
})
// router.post("/:id", async () => {

// })
// router.post("/:name", async () => {

// })

module.exports = router