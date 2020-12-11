//import 
const server = require("../../server")
const request = require("supertest")

//database
const db = require('../../../db/dbConfig')

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

//apply a static state for all tests
beforeEach(prepTestDB)

//local global endpoint url
const url = "/libraries/"

// get all libaries 
it("check that all query returns all libraries", async () => {
    // request resource
    const res = await request(server).get(url)

    // validate resp
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(29) // total testing libraries is 29 
})

it(" 404 no libraries", async() => {
    //delete all libraries
    await db("libraries").delete()

    //call server
    const res = await request(server).get(url)
    //validate server response
    expect(res.status).toBe(404)
    expect(res.body.error).toMatch(/No libraries at this moment/i)
})

it("check all query strings work", async () => {
    //request resource
    const res = await request(server).get(`${url}?limit=5&order=desc&offset=1`)

    //validate resp 
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(5)
    expect(res.body[0].id).toBe(28)

})

it("avoid a list of libraries", async () => {
    // list of items to avoid
    const avoid = JSON.stringify([2,3,4])

    // request resource
    const res = await request(server).get(`${url}?limit=5&avoid=${avoid}`) 
    // validate resp
    expect(res.status).toBe(200)
    expect(res.body[1].id).not.toBe(2)
    expect(res.body[2].id).not.toBe(3)
    expect(res.body[3].id).not.toBe(4)
})
it.todo("check all validations work")