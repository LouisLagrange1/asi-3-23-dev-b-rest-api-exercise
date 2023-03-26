import "dotenv/config";
import { resolve } from "node:path";

const config = {
  port: 3000,
  db: {
    client: "pg",
    connection: {
      host: process.env.DB_CONNECTION_HOST,
      port: process.env.DB_CONNECTION_PORT,
      user: process.env.DB_CONNECTION_USER,
      password:"Loumain92",
      database: process.env.DB_CONNECTION_DATABASE,
    },
    migrations: {
      directory: resolve("src/db/migrations"),
      stub: resolve("src/db/migrations.stub"),
    },
  },
  security: {
    jwt: {
      secret: process.SECURITY_JWT_SECRET,
      options: {
        expiresIn: "2 days",
      },    },
    password: {
      saltLen: 128,
      keylen: 128,
      iterations: 100000,
      digest: "sha512",
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
    },
  },
};

export default config;
