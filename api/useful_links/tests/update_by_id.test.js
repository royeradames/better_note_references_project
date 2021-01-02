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
const url = "/useful_links/"

it("update a useful_link", async () => {
    // request server
    const res = await request(server).put(`${url}1`)

    //validate resp
   console.log(res.body) 
   expect(res.status).toBe(200)
})
it.todo("only accept valid inputs")
it.todo("no useful_link")

