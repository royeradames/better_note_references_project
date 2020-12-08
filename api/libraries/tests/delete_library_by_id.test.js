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
it.todo("validation works")
it.todo("404 if there is no matching library to delete")
it.todo("404 if there is no avaliable library to delete")