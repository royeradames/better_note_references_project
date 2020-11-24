/* libraries */
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")

/*routers */
const libraries_router = require("./libraries/libraries_router") 
const tags_router = require("./tags/tags_router")
/* start server */
const server = express()

/* Middlewares*/
//build in middleware or application level(included with express)
server.use(express.json())

// third-party middleware (install from NPM)
server.use(helmet())
server.use(morgan("dev"))
server.use("/libraries", libraries_router)
server.use("/tags", tags_router)

//custom middleware (write it from scatch)
server.get("/", (req, res) => {
    res.status(200).send(`<h1>Server is up and running</h1>`)
})
//error middleware (catch errors in other middleware)
server.use((err, req, res, next) => {
    res.status(500).json({err})
})


module.exports = server