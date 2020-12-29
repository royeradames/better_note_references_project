//import db
const db = require("../../db/dbConfig")

//export functions
module.exports = {
    get_all,
    get_by_id,
    get_by_name,
    new_resource,
}

function get_by_id(id){
    return db("useful_links").where({id}).first()
}
function get_all(){
    return db("useful_links")
}
function get_by_name(name){
    return db("useful_links").where({name}).first()
}
async function new_resource(link_data){
   await db("useful_links").insert(link_data) 
   return await get_by_name(link_data.name)
}