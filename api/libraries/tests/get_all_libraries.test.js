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
it("check that all query returns all libraries", async () => {
    // request resource
    const res = await request(server).get(url)

    // validate resp
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(29) // total testing libraries is 29 
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

it("check all query strings work", async () => {
    //request resource
    const res = await request(server).get(`${url}?limit=5&order=desc&offset=1`)

    //validate resp 
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(5)
    expect(res.body[0].id).toBe(28)

})

it("avoid a list of libraries", async () => {
    // list of items to avoid
    const avoid = JSON.stringify([2,3,4])

    // request resource
    const res = await request(server).get(`${url}?limit=5&avoid=${avoid}`) 
    // validate resp
    expect(res.status).toBe(200)
    expect(res.body[1].id).not.toBe(2)
    expect(res.body[2].id).not.toBe(3)
    expect(res.body[3].id).not.toBe(4)
})
describe("check all validations work", () => {
        /*
            what are the validations?
            limit
            -integer
            -min 1 - max 100
            order
            - one of asc or desc
            offset
            - integer
            avoid
            - array
            - integers
        */
    

    
    it("fail because \n - limit not a integer, \n - order not asc or desc, \n - offset not an ineger, \n - avoid not integer", async () => {
        
        //request server with invalid inputs
        const res = await request(server).get(`${url}?limit=101&order=error&offset=a&avoid=[1, "a"]`)

        // validate resp
        expect(res.status).toBe(404)
        expect(res.body[0].param).toMatch(/limit/i)
        expect(res.body[0].value).toMatch(/101/i)
        expect(res.body[0].msg).toMatch(/must be a whole number from 1 to 100/i)
        expect(res.body[1].param).toMatch(/order/i)
        expect(res.body[1].value).toMatch(/error/i)
        expect(res.body[1].msg).toMatch(/must be asc or desc/i)
        expect(res.body[2].param).toMatch(/offset/i)
        expect(res.body[2].value).toMatch(/a/i)
        expect(res.body[2].msg).toMatch(/must be a integer/i)
        expect(res.body[3].param).toMatch(/avoid/i)
        expect(res.body[3].value).toMatch(/a/i)
        expect(res.body[3].msg).toMatch(/must only contain numbers/i)
    })
    it("check limit error if when value is less than 1", async () => {

        //request server with invalid inputs
        const res = await request(server).get(`${url}?limit=0`)

        // validate resp
        expect(res.status).toBe(404)
        expect(res.body.value).toMatch(/0/i)
        expect(res.body.msg).toMatch(/must be a whole number from 1 to 100/i)
        
    })
    it("selecting asc works", async () => {

        //request server with invalid inputs
        const res = await request(server).get(`${url}?limit=10&order=asc`)

        // validate resp
        expect(res.status).toBe(200)
        expect(res.body[0].id).toBe(1)
        expect(res.body[1].id).toBe(2)
        expect(res.body[2].id).toBe(3)
    })
    it("selecting desc works", async() => {
        //request server with invalid inputs
        const res = await request(server).get(`${url}?limit=10&order=desc`)

        // validate resp
        expect(res.status).toBe(200)
        expect(res.body[0].id).toBe(29)
        expect(res.body[1].id).toBe(28)
        expect(res.body[2].id).toBe(27)

    })
    it("check avoid fails if it's not an array", async () => {
        // generate avoid input like front-end would 
        const avoid = JSON.stringify("1,2")

        // request server with invalid inputs
        const res = await request(server).get(`${url}?limit=10&avoid=${avoid}`)

        // validate resp
        expect(res.status).toBe(404)
        expect(res.body.param).toMatch(/avoid/i)
        expect(res.body.value).toMatch(/1/i)
        expect(res.body.msg).toMatch(/must be an array/i)

    })
})