export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("displayName").notNullable();
    table.text("email").notNullable().unique();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("content").notNullable();
    table.datetime("publishedAt");
    table.integer("userId").references("id").inTable("users");
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.text("content").notNullable();
    table.integer("userId").references("id").inTable("users");
    table.integer("postId").references("id").inTable("posts");
    table.timestamps(true, true, true);
  });
  await knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name").notNullable();
  });
  await knex.schema.createTable("rel_posts__tags", (table) => {
    table.integer("postId").references("id").inTable("posts");
    table.integer("tagId").references("id").inTable("tags");
  });
};
export const down = async (knex) => {
  await knex.schema.dropTable("rel_posts__tags");
  await knex.schema.dropTable("tags");
  await knex.schema.dropTable("comments");
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("users");
};