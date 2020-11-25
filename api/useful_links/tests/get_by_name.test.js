// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

// get db access
const db = require("../../../db/dbconfig")

//get function that can resets the databse
const prepTestDB = require("../../../helpers/prepTestDB")

//make db static for each test
beforeEach(prepTestDB)

//endpoint url
const url = "/useful_link/name/"

it.todo("valid resp")
it.todo("invalid id")
it.todo("no links")