//import db
const db = require("../../db/dbConfig")

//export functions
module.exports = {
    get_all_useful_links
}

async function get_all_useful_links(){
    return db("useful_links")
}