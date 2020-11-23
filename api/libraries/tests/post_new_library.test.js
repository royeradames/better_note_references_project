//import 
const server = require("../../server")
const request = require("supertest")
// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

const url = "/libraries/"

describe("success", () => {
    it("add new library to the db", async () => {
        // call server
        const res = await request(server).post(url).send({
            name: "testing correctly",
            description: "This is a test, and everything should work just fine.",
            tag_name: "backend",
            link: "https://test.com/",
        })

        //check reserver responds
        console.log(res.body)
        expect(res.status).toBe(200)
    })

})

describe('client errors', () => {
    it("add new library", async () => {
        // call server
        const res = await request(server).post(url).send({
            name: "express",
            description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
            tag_name: "backend",
            link: "https://expressjs.com/",
        })

        //check server responds
        expect(res.status).toBe(406)
        expect(res.body).toMatch(/already exists/i)
    })
    it('invalid name', async () => {
        const res = await request(server).post(url).send({
            name: "express.js",
            description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
            tag_name: "backend",
            link: "https://expressjs.com/",
        })

        //check server responds
        expect(res.status).toBe(404)
        expect(res.body[0].value).toMatch(/express.js/i)
        expect(res.body[0].param).toMatch(/name/i)
    })
})