//import
const server = require("../../server")
const request = require("supertest")

//database
const db = require("../../../db/dbConfig")

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static db for each tests
beforeEach(prepTestDB)

// local global endpoint url
const url = "/useful_links/"

it("check all useful links are return", async () => {
    //call server
    const res = await request(server).get(url)

    //validate server resp
    expect(res.status).toBe(200)    
    // expect(res.body).toMatch(//i)
    expect(res.body[0].id).toBe(1)
    expect(res.body[0].name).toMatch(/node.js documentation/i)
    expect(res.body[0].description).toMatch(/the official api reference/i)
    expect(res.body[0].tag_name).toMatch(/backend/i)
})
it("let user know if there is no useful_links", async () => {
    //delete all links
    await db("useful_links").delete()

    // call server
    const res = await request(server).get(url)

    //validate server resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/no links/i)
})
