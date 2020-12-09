// import server and request
const server = require("../../server")
const request = require("supertest")

//database
// const db = require("../../../dbConfig")

// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

// resource url
const url = "/libraries/"

it("delete a library", async () => {
    // request resource
    const res = await request(server).delete(`${url}1`)

    // valid server response
    expect(res.status).toBe(200)
    expect(res.body.deleted_library.name).toMatch(/express/i)
})
it("validation works", async () => {
    //request resource
    const res = await request(server).delete(`${url}a`)

    //check validation is working
    expect(res.status).toBe(404)
    expect(res.body.msg).toMatch(/must be an integer/i)
})
it.todo("404 if there is no matching library to delete")
it.todo("404 if there is no avaliable library to delete")