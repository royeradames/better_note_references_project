// import server and request
const server = require("../../server")
const request = require("supertest")

//database
const db = require("../../../dbConfig")

// prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static state for all tests
beforeEach(prepTestDB)

// resource url
const url = "/libraries/"

it.todo("delete a library")
it.todo("validation works")
it.todo("404 if there is no matching library to delete")
it.todo("404 if there is no avaliable library to delete")