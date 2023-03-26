export const up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id")
    table.string("name").notNullable()
    table.json("permissions").notNullable()
  })

  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.integer("role_id").references("id").inTable("roles")
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable("pages", (table) => {
    table.increments("id")
    table.string("title").notNullable()
    table.text("content").notNullable()
    table.string("slug").unique().notNullable()
    table.integer("creator").references("id").inTable("users")
    table.string("status").notNullable()
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable("navigation_menus", (table) => {
    table.increments("id")
    table.string("name").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("navigation_menus")
  await knex.schema.dropTable("pages")
  await knex.schema.dropTable("users")
  await knex.schema.dropTable("roles")
}
