//import db
const db = require("../../db/dbConfig")

//export functions
module.exports = {
    get_all,
    by_id,
    by_name,
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