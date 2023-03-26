import hashPassword from "../hashPassword.js"

export const seed = async (knex) => {
  await knex.raw("TRUNCATE TABLE pages RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
  await knex.raw("TRUNCATE TABLE roles RESTART IDENTITY CASCADE")

  const [passwordHash, passwordSalt] = await hashPassword("TestMDP92?")

  await knex("roles").insert([
    {
      name: "admin",
      permissions: {
        users: "",
        roles: "",
        pages: "",
        navigation_menus: "",
        rel_navigations_pages: "",
      },
    },
    {
      name: "manager",
      permissions: {
        users: "",
        roles: "",
        pages: "",
        navigation_menus: "",
        rel_navigations_pages: "",
      },
    },
    {
      name: "editor",
      permissions: {
        users: "",
        roles: "",
        pages: "",
        navigation_menus: "",
        rel_navigations_pages: "",
      },
    },
  ])

  await knex("users").insert([
    {
      email: "first@example.com",
      role_id: 1,
      firstName: "First",
      lastName: "User",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
    },
    {
      email: "manager@example.com",
      role_id: 2,
      firstName: "Second",
      lastName: "User",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
    },
    {
      email: "editor@example.com",
      role_id: 3,
      firstName: "Third",
      lastName: "User",
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
    },
  ])

  await knex("pages").insert([
    {
      title: "First Page",
      content: "My first page",
      slug: "firstpage",
      creator: 1,
      status: "published",
    },
    {
      title: "Second Page",
      content: "My second page",
      slug: "secondpage",
      creator: 1,
      status: "published",
    },
    {
      title: "Third page",
      content: "My third page",
      slug: "thirdpage",
      creator: 2,
      status: "published",
    },
  ])

  await knex("navigation_menus").insert([
    { name: "First menu" },
    { name: "Second menu" },
  ])
}