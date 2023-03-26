import PageModel from "../db/models/PageModel.js"
// import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import auth from "../middlewares/auth.js"
import {
  contentValidator,
  idValidator,
  limitValidator,
  orderValidator,
  pageValidator,
  titleValidator,
} from "../validators.js"

const preparePagesRoutes = ({ app }) => {
  app.post(
    "/pages",
    auth,
    validate({
      body: {
        tilte: titleValidator.required(),
        content: contentValidator.required(),
        slug: contentValidator.required(),
        status: contentValidator.required(),
      },
    }),

    async (req, res) => {
      const {
        body: { title, content, slug, status },
        session: {
          user: { id: userId },
        },
      } = req.locals
      const pages = await PageModel.query()
        .insert({
          title,
          content,
          slug,
          status,
          creator: userId,
        })
        .returning("*")

      res.send({ result: pages })
    }
  )

  app.get(
    "/pages",
    validate({
      query: {
        limit: limitValidator,
        page: pageValidator,
        order: orderValidator.default("desc"),
      },
    }),
    async (req, res) => {
      const { limit, page, order } = req.locals.query
      const pages = await PageModel.query()
        .modify("paginate", limit, page)
        .orderBy("id", order)

      res.send({
        result: pages,
      })
    }
  )

  app.get(
    "/pages/:pageId",
    validate({
      params: {
        pageId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const page = await PageModel.query().findById(req.params.pageId)

      if (!page) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send({ result: page })
    }
  )

  app.delete(
    "/pages/:pageId",
    auth,
    validate({
      params: {
        pageId: idValidator.required(),
      },
    }),
    async (req, res) => {
      const pages = await PageModel.query().findById(req.params.pageId)

      if (!pages) {
        res.status(404).send({ error: "not found" })

        return
      }

      await PageModel.query().delete().where({
        id: req.params.pageId,
      })

      res.send({ result: pages })
    }
  )
  app.patch(
    "/pages/:pageId",
    auth,
    validate({
      params: {
        pageId: idValidator.required(),
      },
      body: {
        tilte: titleValidator,
        content: contentValidator,
        slug: contentValidator,
        status: contentValidator,
      },
    }),
    async (req, res) => {
      const {
        body: { title, content, slug, status },
      } = req.locals

      const pageUpdate = await PageModel.query()
        .update({
          ...(title ? { title } : {}),
          ...(content ? { content } : {}),
          ...(slug ? { content } : {}),
          ...(status ? { status } : {}),
        })
        .where({
          id: req.params.pageId,
        })
        .returning("*")

      res.send({ result: pageUpdate })
    }
  )
}

export default preparePagesRoutes
