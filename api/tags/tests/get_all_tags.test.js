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
it("check limit, order, and avoid options work", async () => {
    //create an avoid list like the front end would
    const avoid_list = JSON.stringify(["general"])

    //call server
    const res = await request(server).get(`${url}?limit=20&order=desc&avoid=${avoid_list}`)

    //validate server resp
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body[0]).toMatch(/frontend/i)
    expect(res.body[1]).toMatch(/backend/i)
})
describe("check validation works", () => {
    describe("check limit falls within range", ()=> {
        it.todo("check that limit fail if you want 0 things")
        it.todo("check that limit fail if you want 101 things")
        it.todo("check that limit pass if you want something within range")
    })
   it.todo("check order can be set on desc") 
   it.todo("check order can be set on asc") 
   it.todo("check avoid can ignore unwanted tags") 
   it.todo("check avoid can fails if not pass down a valid name") 
})