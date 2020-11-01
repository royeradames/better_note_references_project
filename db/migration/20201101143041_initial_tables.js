
exports.up = function(knex) {
  knex.schema.createTable("images", (table) => {
      table.increments("id")
      table.text("name")
      table.binary("image")
      table.text("alt_text")
  })
    knex.schema.createTable("libraries", (table) => {
    table.increments("id")
    table.text("name")
    table.text("description")
    table.foreign("image_id").references("id").inTable("images")
    table.text("tags")
  })
  knex.schema.createTable("useful_links", table => {
      table.increments("id")
      table.text("name")
      table.text("url")
  })
  knex.schema.createTable("tags", (table) => {
      table.text("name").primary().unique().notNullable()
      table.foreign("libary_id").references("id").inTable("libraries")
      table.foreign("useful_link").references("id").inTable("useful_links")
  })
  knex.schema.createTable("posts", table =>{
      table.increments("id")
      table.text("title")
      table.text("content")
  })
  knex.schema.createTable("post_images", table =>{
    table.increments("id")
    table.foreign("id").references("id").inTable("posts")
    table.foreign("id").references("id").inTable("images")
  })
}

exports.down = function(knex) {
  
}
