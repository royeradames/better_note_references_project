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
const url = "/tags/"

it("change tag name", async () => {
    //call server
    const res = await request(server).put(url).send({
        tag: "frontend",
        new_tag: "devops"
    })

    //validate server
    expect(res.status).toBe(200)    
    expect(res.body.old_tag_name).toMatch(/frontend/i)
    expect(res.body.new_tag_name).toMatch(/devops/i)
})
it.todo("don't allow non alphabet names")
it.todo("let the user know there is no tags when there is none")
it.todo("when no tags, check for valid resp")