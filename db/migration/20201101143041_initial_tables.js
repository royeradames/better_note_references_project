
exports.up = function(knex) {
  return knex.schema
  .createTable("images", (table) => {
      table.increments("id")
      table.text("name")
      table.binary("image")
      table.text("alt_text")
  })
  .createTable("tags", (table) => {
      table.text("name").primary().unique().notNullable()
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
    table.text("tag_name")
        .unsigned()
        .references("tags.name")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
  })
  .createTable("useful_links", table => {
      table.increments("id")
      table.text("name")
      table.text("url")
      table.text("tag_name")
        .unsigned()
        .references("tags.name")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
  })
  .createTable("posts", table =>{
      table.increments("id")
      table.text("title")
      table.text("content")
      table.text("tag_name")
        .unsigned()
        .references("tags.name")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
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
