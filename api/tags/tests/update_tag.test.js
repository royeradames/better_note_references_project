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
it("don't allow non alphabet names", async () => {
    //call server
    const res = await request(server).put(url).send({
        tag: "1frontend",
        new_tag: "1devops"
    })

    //validate server
    expect(res.status).toBe(404)    
    expect(res.body[0].value).toMatch(/1frontend/i)
    expect(res.body[0].msg).toMatch(/must be alphabetic letters/i)
    expect(res.body[1].value).toMatch(/1devops/i)
    expect(res.body[1].msg).toMatch(/must be alphabetic letters/i)

})
it("let the user know there is no tags when there is none", async () => {
    //delete db
    await db("tags").delete()

    //call server
    const res = await request(server).put(url).send({
        tag: "frontend",
        new_tag: "devops"
    })

    //validate server
    expect(res.status).toBe(404)    
    expect(res.body).toMatch(/tag is not found/i)

})