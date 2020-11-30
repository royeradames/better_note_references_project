//import 
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

// get all tags
it("return all tags", async () =>{
    //call server
    const res = await request(server).get(url)

    //validate server response
    expect(res.status).toBe(200)    
    expect(res.body[0]).toMatch("frontend")
})
it("no tags available, returns a message saying so", async () => {
    //delete all tags
    await db("tags").delete()

    //call server
    const res = await request(server).get(url)

    //validate server resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/no tags/i)
})