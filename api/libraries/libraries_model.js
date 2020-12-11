const db = require("../../db/dbConfig")

module.exports = {
    find_by_id,
    find_by_name,
    get_all_libraries,
    new_library,
    update_by_id,
    delete_by_id,
}
async function delete_by_id(id){
    const deleted_library = await find_by_id(id)
    await db("libraries")
        .where({id})
        .delete()
    return deleted_library
}
async function update_by_id(id, data){
    await db("libraries")
        .where({id})
        .update(data)
    return db("libraries")
        .where({id})
        .first()
}
async function new_library(library_data){
    await db("libraries")
        .insert(library_data)
    return db("libraries").where({name: library_data.name}).first()
}
async function find_by_id(id){
    return db("libraries").select("*").where({id})
}

async function get_all_libraries(is_get_all, options){
    // activate all query strings options
    // default values does not affect a general select * from libraries 
    let query = db("libraries") 

    //  or return all libraries
    if(is_get_all){
        return query
    }
    else{
        // limit the results
       return query
        .limit(options.limit)
        .orderBy("id", options.order)
        .offset(options.offset)
        .whereNotIn('id', JSON.parse(options.avoid))
    }
        
}

async function find_by_name(name){
    return db("libraries").where({name}).select("*")
}