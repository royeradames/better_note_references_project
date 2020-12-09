//import 
const server = require("../../server")
const request = require("supertest")

// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

//local global endpoint url
const url = "/libraries/name"

describe("200", () => {
    it("given name IS ON database", async () => {
        //call server 
        const res = await request(server).get(`${url}/express`)

        //validate server response
        expect(res.status).toBe(200)
        expect(res.body.name).toMatch(/express/i)
    })
})
describe("404", () => {
    it("given name NOT on database", async () => {
        //call server 
        const res = await request(server).get(`${url}/notalibraryonthedatabase`)

        //validate server response
        expect(res.status).toBe(404)
        expect(res.body.error).toEqual(expect.any(String))
    })
    it("validation are working has expected", async () => {
        //call server 
        const res = await request(server).get(`${url}/123`)

        //validate server response
        expect(res.status).toBe(404)
        expect(res.body[0].value).toMatch(/123/i)
        expect(res.body[0].msg).toMatch(/must be letters/i)
        expect(res.body[0].param).toMatch(/name/i)
    })
})

