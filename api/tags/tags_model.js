const db = require("../../db/dbConfig")

module.exports = {
    get_all_tags
}

async function get_all_tags(){
    return db("tags").select()
}