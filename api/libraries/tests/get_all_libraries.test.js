//import 
const server = require("../../server")
const request = require("supertest")

//database
const db = require('../../../db/dbConfig')

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

//apply a static state for all tests
beforeEach(prepTestDB)

//local global endpoint url
const url = "/libraries/"

// get all libaries 
it("/ 200 return all libraries", async () =>{
    //call server 
    const res = await request(server).get("/libraries/")

    //validate server response
    expect(res.status).toBe(200)
    expect(res.body[0].name).toMatch(/express/i)
})

it(" 404 no libraries", async() => {
    //delete all libraries
    await db("libraries").delete()

    //call server
    const res = await request(server).get(url)

    //validate server response
    expect(res.status).toBe(404)
    expect(res.body.error).toMatch(/No libraries at this moment/i)
})