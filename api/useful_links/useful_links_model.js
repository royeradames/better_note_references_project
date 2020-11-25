//import db
const db = require("../../db/dbConfig")

//export functions
module.exports = {
    get_all,
    by_id
}

function by_id(id){
    return db("useful_links").where({id})
}
function get_all(){
    return db("useful_links")
}
