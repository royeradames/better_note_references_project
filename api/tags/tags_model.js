const db = require("../../db/dbConfig")

module.exports = {
    get_all_tags,
    post_new_tag,
}

async function get_all_tags(is_get_all, options){
    
    if(is_get_all){
        return db("tags")
            .pluck("name") 
    }
    else{
        return db("tags")
            .limit(options.limit)
            .orderBy("name", options.order)
            .whereNotIn('name', JSON.parse(options.avoid))
            .pluck("name") 
    }
}
async function post_new_tag(name){
    await db("tags").insert({name})
    return db("tags").where({name})
}