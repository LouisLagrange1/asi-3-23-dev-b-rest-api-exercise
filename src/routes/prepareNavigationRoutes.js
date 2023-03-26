import validate from "../middlewares/validate.js"
import auth from "../middlewares/auth.js"
import {
  idValidator,
  limitValidator,
  orderValidator,
  pageValidator,
  titleValidator,
} from "../validators.js"
import NavigationMenuModel from "../db/models/NavigationMenuModel.js"

const prepareNavigationRoutes = ({ app }) => {
  app.post(
    "/navigation-menus",
    auth,
    validate({
      body: {
        name: titleValidator.required(),
      },
    }),

    async (req, res) => {
      const {
        body: { name },
      } = req.locals
      const navigation = await NavigationMenuModel.query()
        .insert({
          name,
        })
        .returning("*")

      res.send({ result: navigation })
    }
  )

  app.get(
    "/navigation-menus",
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
      const navigation = await NavigationMenuModel.query()
        .modify("paginate", limit, page)
        .orderBy("id", order)

      res.send({
        result: navigation,
      })
    }
  )

  app.get(
    "/navigation-menus/:navigationMenuId",
    auth,
    validate({
      params: {
        navigationMenuId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const navigation = await NavigationMenuModel.query().findById(
        req.params.navigationMenuId
      )

      if (!navigation) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send({ result: navigation })
    }
  )

  app.delete(
    "/navigation-menus/:navigationMenuId",
    auth,
    validate({
      params: {
        navigationMenuId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const navigation = await NavigationMenuModel.query().findById(
        req.params.navigationMenuId
      )

      if (!navigation) {
        res.status(404).send({ error: "not found" })

        return
      }

      await NavigationMenuModel.query().delete().where({
        id: req.params.navigationMenuId,
      })

      res.send({ result: navigation })
    }
  )
}

export default prepareNavigationRoutes
