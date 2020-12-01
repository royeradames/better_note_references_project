const db = require("../../db/dbConfig")

module.exports = {
    get_all_tags,
    post_new_tag,
}

async function get_all_tags(){
    return db("tags")
        .pluck("name") 
}
async function post_new_tag(name){
    await db("tags").insert({name})
    return db("tags").where({name})
}