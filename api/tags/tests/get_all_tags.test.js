//import 
const server = require("../../server")
const request = require("supertest")


//database
const db = require("../../../db/dbConfig")

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

//apply a static db for each tests
beforeEach(prepTestDB)

//local global endpoint url
const url = "/tags/"

// get all tags
it("return all tags", async () =>{
    //call server
    const res = await request(server).get(url)

    //validate server response
    expect(res.status).toBe(200)    
    expect(res.body[0]).toMatch("frontend")
})
it("no tags available, returns a message saying so", async () => {
    //delete all tags
    await db("tags").delete()

    //call server
    const res = await request(server).get(url)

    //validate server resp
    expect(res.status).toBe(404)
    expect(res.body).toMatch(/no tags/i)
})
it("check limit, order, and avoid options work", async () => {
    //create an avoid list like the front end would
    const avoid_list = JSON.stringify(["general"])

    //call server
    const res = await request(server).get(`${url}?limit=20&order=desc&avoid=${avoid_list}`)

    //validate server resp
    expect(res.status).toBe(200)
    expect(res.body[0]).toMatch(/frontend/i)
    expect(res.body[1]).toMatch(/backend/i)
})
it("check avoid defaul value works", async () => {
    //call server
    const res = await request(server).get(`${url}?limit=20&order=desc`)

    //validate server resp
    expect(res.status).toBe(200)
    expect(res.body[0]).toMatch(/general/i)
    expect(res.body[1]).toMatch(/frontend/i)
    expect(res.body[2]).toMatch(/backend/i)

})
describe("check validation works", () => {
    describe("check limit falls within range", ()=> {
        it("check that limit fail if you want 0 things", async () => {
            //create an avoid list like the front end would
            const avoid_list = JSON.stringify(["general"])

            //call server
            const res = await request(server).get(`${url}?limit=0&order=desc&avoid=${avoid_list}`)

            //validate server resp
            expect(res.status).toBe(404)
            expect(res.body.value).toMatch(/0/i)
            expect(res.body.msg).toMatch(/must be a whole number from 1 to 100/i)

        })
        it("check that limit fail if you want 101 things", async () => {
            //call server
            const res = await request(server).get(`${url}?limit=101`)

            //validate server resp
            expect(res.status).toBe(404)
            expect(res.body.value).toEqual("101")
            expect(res.body.msg).toMatch(/must be a whole number from 1 to 100/i)

        })
        it("check that limit pass if you want something within range", async () => {
            //call server
            const res = await request(server).get(`${url}?limit=10`)

            //validate server resp
            expect(res.status).toBe(200)
            expect(res.body).toHaveLength(3)
            expect(res.body[0]).toMatch(/backend/i)
            expect(res.body[2]).toMatch(/general/i)

        })
    })
   it("check order can be set on desc", async () => {
            //call server
            const res = await request(server).get(`${url}?order=desc`)

            //validate server resp
            expect(res.status).toBe(200)
            expect(res.body).toHaveLength(3)
            expect(res.body[0]).toMatch(/general/i)
            expect(res.body[2]).toMatch(/backend/i)

    }) 
   it("check order can be set on asc", async () => {
        //call server
        const res = await request(server).get(`${url}?order=asc`)

        //validate server resp
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
        expect(res.body[0]).toMatch(/backend/i)
        expect(res.body[2]).toMatch(/general/i)

   }) 
   it("check avoid can ignore unwanted tags", async () => {
        //call server
        const res = await request(server).get(`${url}?avoid=["backend", "general"]`)

        //validate server resp
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0]).toMatch(/frontend/i)

   }) 
   it.todo("check avoid can fails if not pass down a valid name") 
})