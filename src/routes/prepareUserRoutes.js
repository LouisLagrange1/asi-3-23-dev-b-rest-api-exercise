// import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import auth from "../middlewares/auth.js"
import {
  contentValidator,
  idValidator,
  limitValidator,
  orderValidator,
  pageValidator,
  passwordValidator,
  titleValidator,
} from "../validators.js"
import UserModel from "../db/models/UserModel.js"
import hashPassword from "../db/hashPassword.js"

const prepareUsersRoutes = ({ app }) => {
  app.post(
    "/users",
    auth,
    validate({
      body: {
        email: titleValidator.required(),
        firstName: contentValidator.required(),
        lastName: contentValidator.required(),
        password: passwordValidator.required(),
      },
    }),

    async (req, res) => {
      const {
        body: { email, firstName, lastName, password },
      } = req.locals
      const [passwordHash, passwordSalt] = await hashPassword(password)

      const user = await UserModel.query()
        .insert({
          email,
          firstName,
          lastName,
          passwordHash,
          passwordSalt,
        })
        .returning("*")

      res.send({ result: user })
    }
  )

  app.get(
    "/users",
    auth,
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        order: orderValidator.default("desc"),
      },
    }),
    async (req, res) => {
      const { limit, page, order } = req.locals.query
      const users = await UserModel.query()
        .modify("paginate", limit, page)
        .orderBy("id", order)

      res.send({
        result: users,
      })
    }
  )

  app.get(
    "/users/:userId",
    auth,
    validate({
      params: {
        userId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const user = await UserModel.query().findById(req.params.userId)

      if (!user) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send({ result: user })
    }
  )

  app.delete("/users/:userId", async (req, res) => {
    const user = await UserModel.query().findById(req.params.userId)

    if (!user) {
      res.status(404).send({ error: "not found" })

      return
    }

    await UserModel.query().delete().where({
      id: req.params.userId,
    })

    res.send({ result: user })
  })
}

export default prepareUsersRoutes
