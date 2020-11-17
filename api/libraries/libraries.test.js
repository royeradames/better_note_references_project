//import 
const server = require("../server")
const request = require("supertest")
// prep test database
const prepTestDB = require("../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

it("/ 200 return all libraries", async () =>{
    const res = await request(server).get("/libraries/")

    expect(res.status).toBe(200)
    expect(res.body.libraries).toEqual(expect.any(Object))
})

it("/:id 200 valid id found in server", async () => {
    const res = await request(server).get("/libraries/1")

    expect(res.status).toBe(200)
    expect(res.body.library).toEqual(expect.any(Object))
})

it("/:id 404 invalid id", async () => {
    const res = await request(server).get("/libraries/a")

    expect(res.status).toBe(404)
    expect(res.body.error).toEqual(expect.any(String))
})

it("/findlibrarybyname/:name 200 given name IS ON database", async () => {
    const res = await request(server).get("/libraries/findlibrarybyname/express.js")

    expect(res.status).toBe(200)
    expect(res.body.library).toEqual(expect.any(Array))
})
it("/findlibrarybyname/:name 404  given name NOT on database", async () => {
    const res = await request(server).get("/libraries/findlibrarybyname/notalibraryonthedatabase")

    expect(res.status).toBe(404)
    expect(res.body.error).toEqual(expect.any(String))
})