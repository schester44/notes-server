import Router from 'koa-router'
import auth from './modules/auth/routes'

const router = new Router()

auth.createRoutes(router)

export default router
