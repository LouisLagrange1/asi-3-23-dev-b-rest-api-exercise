import express from "express"
import knex from "knex"
import winston from "winston"
import BaseModel from "./db/models/BaseModel.js"
import prepareRoutes from "./prepareRoutes.js"
import cors from "cors"

const run = async (config) => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  })

  const db = knex(config.db)

  db.on("query", ({ sql }) => logger.debug(sql))

  BaseModel.knex(db)

  const app = express()
  const ctx = {
    app,
    db,
    logger,
  }

  app.use((req, res, next) => {
    req.locals = {}

    next()
  })
  app.use(express.json())
  app.use(cors())
  prepareRoutes(ctx)

  app.listen(config.port, () => console.log(`Listening in : ${config.port}`))
}

export default run
