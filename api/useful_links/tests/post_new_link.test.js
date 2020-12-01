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
it("only accept valid input", async () =>{
    // call server with invalid inputs
    const res = await request(server).post(url).send({
        name: "new link console.log(`testing`)",
        description: "this is a test that is testing the new link creation. console.log(\" I am trying to insert some javascript inside the db\")",
        url: "royeradames",
        tag_name: "not a tag",
    })

    //validate server resp
    expect(res.status).toBe(404)
    expect(res.body[0].param).toMatch(/name/i)
    expect(res.body[0].msg).toMatch(/can only have/i)
    expect(res.body[1].param).toMatch(/description/i)
    expect(res.body[1].msg).toMatch(/can only have/i)
    expect(res.body[2].param).toMatch(/url/i)
    expect(res.body[2].msg).toMatch(/must be an url/i)
    expect(res.body[3].param).toMatch(/tag_name/i)
    expect(res.body[3].msg).toMatch(/not found/i)
})
