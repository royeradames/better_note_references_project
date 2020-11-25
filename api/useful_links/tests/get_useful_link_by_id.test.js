// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

//get db access
const db = require("../../../db/dbconfig")

// get function that can resets the database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static db for each tests
beforeEach(prepTestDB)

// apply db reset for each test
const url = "/useful_links/"

it("get library by id", async () => {
    // get server resp
    const res = await request(server).get(`${url}/1`)

    //validate server resp
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.name).toMatch(/node.js docum/i)
    expect(res.body.description).toMatch(/the official api reference documentation/i)
})
it.todo("if id not found then resp with id not found")
it.todo("id must be an id")