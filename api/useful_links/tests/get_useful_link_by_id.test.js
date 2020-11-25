// setup server, and server requester
const server = require("../../server")
const request = require("supertest")

//get db access
const db = require("../../../db/dbconfig")

// get function that can resets the database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply db reset for each test
const url = "/useful_links/:id"

it.todo("get library by id")
it.todo("if id not found then resp with id not found")
it.todo("id must be an id")