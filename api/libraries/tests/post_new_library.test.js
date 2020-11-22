//import 
const server = require("../../server")
const request = require("supertest")
// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

const url = "/libraries/"

describe("200", () => {
    it("add new library to the db", async () => {
        // call server
        const res = await request(server).post(url).send({
            name: "express",
            description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
            tag_name: "backend",
            link: "https://expressjs.com/",
        })

        //check reserver responds
        expect(res.status).toBe(200)
    })

})

describe('client errors', () => {
    it("add new library to the db", async () => {
        // call server
        const res = await request(server).post(url).send({
            name: "express",
            description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
            tag_name: "backend",
            link: "https://expressjs.com/",
        })

        //check reserver responds
        expect(res.status).toBe(406)
        expect(res.body).toMatch(/already exists/i)
    })
})