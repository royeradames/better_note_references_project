// import server and requester
const server = require("../../server")
const request = require("supertest")

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

    // check reserver responds
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.name).toMatch(/testing correctly/i)
})

