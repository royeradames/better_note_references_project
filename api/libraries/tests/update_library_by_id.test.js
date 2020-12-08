// import server and requester
const server = require("../../server")
const request = require("supertest")

//database
const db = require('../../../db/dbConfig')

// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

//resource url
const url = "/libraries/"

it("update a new library with valid inputs", async () => {
    // call server
    const res = await request(server).put(url).send({
        id: 1,
        name: "testing correctly",
        description: "This is a test, and everything should work just fine.",
        tag_name: "backend",
        link: "https://test.com/", 
    })

    // check server responds
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.name).toMatch(/testing correctly/i)
})

it("invalid inputs actives validation error resp", async () => {
    //call server
    const res = await request(server).put(url).send({
        id: "1=1",
        name: "\"OR\"\"=\"",
        description: "; DROP TABLE libraries",
        tag_name: "not_in_tags_table",
        link: "not_a_url", 
    })
    //check server responds
    expect(res.status).toBe(404)

    // check all validation fail messages
    expect(res.body[0].value).toMatch(/1=1/i)
    expect(res.body[0].msg).toMatch(/must be an integer/i)
    expect(res.body[1].value).toMatch(/"OR""="/i)
    expect(res.body[1].msg).toMatch(/can only be one or more alphabetic words in all lowercase/i)
    expect(res.body[2].value).toMatch(/; DROP TABLE libraries/i)
    expect(res.body[2].msg).toMatch(/Can only have letters, numbers, periods, dashes, single and double quotes/i)
    expect(res.body[3].value).toMatch(/not_in_tags_table/i)
    expect(res.body[3].msg).toMatch(/must be alphabetic characters/i)
    expect(res.body[4].value).toMatch(/not_a_url/i)
    expect(res.body[4].msg).toMatch(/must be a valid link/i)

})
it("no library to update", async () => {
    // delete library table
    await db("libraries").delete()

    //request resource
    const res = await request(server).put(url).send({
        id: 1,
        name: "testing correctly",
        description: "This is a test, and everything should work just fine.",
        tag_name: "backend",
        link: "https://test.com/", 
    })

    // validate resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/no libraries to be found/i)
})