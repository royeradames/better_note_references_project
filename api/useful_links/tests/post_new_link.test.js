// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

// get db access
const db = require("../../../db/dbConfig")

//get function that can resets the db
const prepTestDB = require("../../../helpers/prepTestDB")

//make db static for each test
beforeEach(prepTestDB)

//endpoint url
const url = "/useful_links/new_link"

it("create new link", async () => {
    const res = await request(server).post(url).send({
        name: "new link",
        description: "this is a test that is testing the new link creation",
        url: "http://www.royeradames.com",
        tag_name: "general",
    })

    //validate server resp
    expect(res.status).toBe(200)
    expect(res.body.new_link.name).toMatch(/new link/i)
    expect(res.body.new_link.description).toMatch(/this is a test/i)
})
it.todo("only accept valid input")
