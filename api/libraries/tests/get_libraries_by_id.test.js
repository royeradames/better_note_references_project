//file
const server = require("../../server")

//middleware
const request = require("supertest")

//prep test database
const prepTestDB =require("../../../helpers/prepTestDB")

//apply a static state for all tests
beforeEach(prepTestDB)

//endpoint url
const url = "/libraries/"

// get libaries by id
it("valid id found in server", async () => {
    //call server 
    const res = await request(server).get(`${url}/1`)

    //validate server response
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.name).toMatch(/express/i)
})

it("invalid id", async () => {
    //call server 
    const res = await request(server).get(`${url}/a`)

    //validate server response
    expect(res.body.value).toMatch(/a/i)
    expect(res.body.param).toMatch(/id/i)
})

