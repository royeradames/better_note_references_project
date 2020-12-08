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
    return db("libraries").where({name: library_data.name})
}
async function find_by_id(id){
    return db("libraries").select("*").where({id})
}

async function get_all_libraries(){
    return db("libraries")
}

async function find_by_name(name){
    return db("libraries").where({name}).select("*")
}