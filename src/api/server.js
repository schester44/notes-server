const debug = require('debug')('api:server')

import session from 'koa-session'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import router from './routes'
import db, { testConnection } from '../db'

const app = new Koa()

app.keys = [process.env.SECRET]

const sessionConfig = {
	key: 'notes:sess',
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: true
}

app.use(session(sessionConfig, app))

app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.status || 500
		ctx.body = err.message
		ctx.app.emit('error', err, ctx)
	}
})

app.use(cors())
app.use(bodyParser())

app.use(router.routes())

const PORT = 4000

export default {
	run: async () => {
		try {
			await testConnection()
			debug(`🗄️  db connected`)
		} catch (e) {
			debug(e)
		}

		app.listen(4000, () => {
			debug(`🚀  listening on ${PORT}`)
		})
	}
}
