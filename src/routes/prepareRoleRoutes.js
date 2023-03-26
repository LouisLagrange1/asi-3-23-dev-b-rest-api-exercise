// import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import auth from "../middlewares/auth.js"
import {
  idValidator,
  limitValidator,
  orderValidator,
  pageValidator,
} from "../validators.js"
import RoleModel from "../db/models/RoleModel.js"

const prepareRoleRoutes = ({ app }) => {
  app.get(
    "/roles",
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
      const roles = await RoleModel.query()
        .modify("paginate", limit, page)
        .orderBy("id", order)

      res.send({
        result: roles,
      })
    }
  )

  app.get(
    "/roles/:roleId",
    auth,
    validate({
      params: {
        roleId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const role = await RoleModel.query().findById(req.params.roleId)

      if (!role) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send({ result: role })
    }
  )
}

export default prepareRoleRoutes
