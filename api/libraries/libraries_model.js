const db = require("../../db/dbConfig")

module.exports = {
    find_by_id,
    find_by_name,
    get_all_libraries,
    new_library,
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