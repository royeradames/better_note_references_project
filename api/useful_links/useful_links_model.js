//import db
const db = require("../../db/dbConfig")

//export functions
module.exports = {
    get_all,
    by_id,
    by_name,
    new_resource,
}

function by_id(id){
    return db("useful_links").where({id})
}
function get_all(){
    return db("useful_links")
}
function by_name(name){
    return db("useful_links").where({name})
}
async function new_resource(link_data){
   await db("useful_links").insert(link_data) 
   return (await db("useful_links").where({name: link_data.name}))[0]
}