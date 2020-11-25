//import
const server =require("../../server")
const request = require("supertest")

//database
const db = require("../../../db/dbConfig")

//prep test database
const prepTestDB = require("../../../helpers/prepTestDB")

// apply a static db for each tests
beforeEach(prepTestDB)

// local global endpoint url
const url = "/useful_links/"

it.todo("check all useful links are return")