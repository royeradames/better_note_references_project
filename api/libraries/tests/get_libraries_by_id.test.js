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
    expect(res.body.library).toEqual(expect.any(Object))
})

it("invalid id", async () => {
    //call server 
    const res = await request(server).get(`${url}/a`)

    //validate server response
    console.log(res.body)
    expect(res.body[0].value).toMatch(/a/i)
    expect(res.body[0].param).toMatch(/id/i)
})

