const server = require("../server")
const request = require("supertest")

// prep test database
const prepTestDB = require("../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

it("200 return all libraries", async function(){
    const res = await request(server).get("/libraries/")

    expect(res.body.libraries).toEqual(expect.any(Object))
    expect(res.status).toBe(200)
})