//import 
const server = require("../../server")
const request = require("supertest")
// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

// get library by name
const url = '/libraries/findlibrarybyname'
it("/findlibrarybyname/:name 200 given name IS ON database", async () => {
    const res = await request(server).get(`${url}/express`)
    expect(res.status).toBe(200)
    expect(res.body.library).toEqual(expect.any(Array))
})
it("/findlibrarybyname/:name 404  given name NOT on database", async () => {
    const res = await request(server).get(`${url}/notalibraryonthedatabase`)

    expect(res.status).toBe(404)
    expect(res.body.error).toEqual(expect.any(String))
})
it('validation are working has expected', async () => {
    const res = await request(server).get(`${url}/123`)

    expect(res.status).toBe(404)
    console.log(res.body)
    expect(res.body[0].value).toMatch(/123/i)
    expect(res.body[0].msg).toMatch(/must be letters/i)
    expect(res.body[0].param).toMatch(/name/i)
})