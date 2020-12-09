// import server and request
const server = require("../../server")
const request = require("supertest")

//database
const db = require("../../../db/dbConfig")

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
it("only accepts integers", async () => {
    //request resource
    const res = await request(server).delete(`${url}a`)

    //check validation is working
    expect(res.status).toBe(404)
    expect(res.body.msg).toMatch(/must be an integer/i)
})
it("404 if there is no matching library to delete", async () => {
    //delete all libraries
    await db("libraries").delete()

    //request resource
    const res = await request(server).delete(`${url}1`)

    //validate resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/no libraries to be found/i)
})
it("404 cannot find id", async () => {
    //check for a out of bound id
    const res = await request(server).delete(`${url}123456`)

    //validate resp
    expect(res.status).toBe(404)
    expect(res.body.error).toMatch(/invalid id/i)
})