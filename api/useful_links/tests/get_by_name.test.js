// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

// get db access
const db = require("../../../db/dbconfig")

//get function that can resets the databse
const prepTestDB = require("../../../helpers/prepTestDB")

//make db static for each test
beforeEach(prepTestDB)

//endpoint url
const url = "/useful_links/name"

it("valid resp", async () => {
    // get resp from server
    const res = await request(server).post(url).send({name: "React Component"})

    // validate server
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(33)
    expect(res.body.name).toMatch(/react component/i)
    expect(res.body.description).toMatch(/react lets you define components/i)
})
it("no links", async () => {
    // delete all links in db
    await db("useful_links").delete()

    //get data from server
    const res = await request(server).post(url).send({name: "React Component"})

    //check server data
    expect(res.status).toBe(404) 
    expect(res.body).toMatch(/no link found/i)
})
it("validation is working", async () => {
    //get resp from server
    const res = await request(server).post(url).send({name: "nota-useful_@Link"})

    // validate server response
    expect(res.status).toBe(404)
    expect(res.body.msg).toMatch(/name can have/i)
    expect(res.body.value).toMatch(/nota-useful_@Link/i)
})