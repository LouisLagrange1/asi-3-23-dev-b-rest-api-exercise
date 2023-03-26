import prepareNavigationRoutes from "./routes/prepareNavigationRoutes.js"
import preparePagesRoutes from "./routes/preparePagesRoutes.js"
import prepareRoleRoutes from "./routes/prepareRoleRoutes.js"
import prepareSignRoutes from "./routes/prepareSignRoutes.js"
import prepareUsersRoutes from "./routes/prepareUserRoutes.js"

const prepareRoutes = (ctx) => {
  prepareSignRoutes(ctx)
  preparePagesRoutes(ctx)
  prepareRoleRoutes(ctx)
  prepareNavigationRoutes(ctx)
  prepareUsersRoutes(ctx)
}

export default prepareRoutes
