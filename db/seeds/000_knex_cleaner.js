//import cleaner from "knex-cleaner"
const cleaner = require("knex-cleaner")

function cleanTables(knex){
    return cleaner
        .clean(knex, {
            mode: "truncate",
            restartIdentify: true, //ask Postgresql to reset the primary keys back to 0
            ignoreTables: ["knex_migrations", "knex_migrations_lock"],
        })
}

// export default function(knex){
exports.seed = function (knex){
    /*
        a recent version of sqlite3 broke knex-cleaner functionality when foreign keys are enabled, so we're temporarily disabling foreign keys when running the seeds against sqlite3.
    */
   if (knex.client.config.client == "sqlite3"){
       return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex))
   }
   else{
       return cleanTables(knex)
   }
}