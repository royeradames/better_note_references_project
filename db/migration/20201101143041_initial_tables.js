
exports.up = function(knex) {
  return knex.schema
  .createTable("images", (table) => {
      table.increments("id")
      table.text("name")
      table.binary("image")
      table.text("alt_text")
  })
  .createTable("libraries", (table) => {
    table.increments("id")
    table.text("name")
    table.text("description")
    table.integer("image_id")
        .unsigned()
        .references("images.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    table.text("tags")
  })
  .createTable("useful_links", table => {
      table.increments("id")
      table.text("name")
      table.text("url")
  })
  .createTable("tags", (table) => {
      table.text("name").primary().unique().notNullable()
      table.integer("libary_id")
        .unsigned()
        .references("libraries.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
      table.integer("useful_link")
        .unsigned()
        .references("useful_links.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
  })
  .createTable("posts", table =>{
      table.increments("id")
      table.text("title")
      table.text("content")
  })
  .createTable("post_images", table =>{
    table.increments("id")
    table.integer("post_id")
        .unsigned()
        .references("posts.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    table.integer("image_id")
        .unsigned()
        .references("images.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
  })
}

exports.down = function(knex) {
    return knex.schema
    .dropTable("images")
    .dropTable("libraries")
    .dropTable("useful_links")
    .dropTable("tags")
    .dropTable("posts")
    .dropTable("post_images")
}
