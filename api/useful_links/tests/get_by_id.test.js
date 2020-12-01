// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

//get db access
const db = require("../../../db/dbconfig")

// get function that can resets the database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static db for each tests
beforeEach(prepTestDB)

// endpoint url
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
it("if id not found then resp with id not found", async () => {
    // delete all links
    await db("useful_links").delete()

    // get sever data
    const res = await request(server).get(`${url}/1`)

    //validate server resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/link not found/i)
})
it("id must be an integer", async () => {
    //request data from server
    const res = await request(server).get(`${url}/not_a_valid_id`)

    //verify server request
    expect(res.status).toBe(404)
    expect(res.body.msg).toMatch(/id must be an integer/i)
    expect(res.body.value).toMatch(/not_a_valid_id/i)
})