/* libraries */
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
/*routers */

/* start server */
const server = express()

/* Middlewares*/
//build in middleware or application level(included with express)
server.use(express.json())

// third-party middleware (install from NPM)
server.use(helmet())
//custom middleware (write it from scatch)
server.use("/", (req, res) => {
    res.status(200).send(`<h1>Server is up and running</h1>`)
})
//error middleware (catch errors in other middleware)
server.use((err, req, res, next) => {
    res.status(500).json(err)
})

export default server