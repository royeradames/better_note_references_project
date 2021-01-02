const db = require("../../db/dbConfig")

module.exports = {
    get_all_tags,
    post_new_tag,
    get_by_name,
    update_name,
    delete_by_name,
}
async function delete_by_name(tag){
    await db("tags")
        .where({name: tag})
        .delete()
    return tag
}
async function get_by_name(tag){
    const new_tag = await db("tags")
        .where({name: tag})
        .first()
    if (new_tag) return new_tag.name 
    else return new_tag
}
async function update_name(tag, new_tag){
    await db("tags")
        .where({name: tag})
        .update({name: new_tag})
    return get_by_name(new_tag)
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