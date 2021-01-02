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

it.todo("only accept alphanumeric inputs ")
it("tag not found", async () => {
    // delete db
    await db("tags").delete()
    // request server
    const res = await request(server).delete(url).send({tag: "frontend"})

    // validate resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/tag is not found/i)

})
it("delete a tag", async () => {
    // request server
    const res = await request(server).delete(url).send({tag: "frontend"})

    // validate resp
    expect(res.status).toBe(200)
    expect(res.body.deleted_tag).toMatch(/frontend/i)
})