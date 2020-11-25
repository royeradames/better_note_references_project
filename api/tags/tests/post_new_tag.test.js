//setup server instance and request option
const server = require("../../server")
const request = require("supertest")

//database
const db = require("../../../db/dbConfig")

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

//apply a static db for each tests
beforeEach(prepTestDB)

//local global endpoint url
const url = "/tags/newtag"

// post new tag
it("accept valid inputs, and creates a unique tag", async () => {
    //call server
    const res = await request(server).post(url).send({name: "testingName"})

    //validate server
    expect(res.status).toBe(200)    
    expect(res.body.new_tag).toMatch(/testingname/i)
})
