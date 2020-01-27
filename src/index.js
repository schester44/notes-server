require('dotenv').config()

const debug = require('debug')('api')

process.on('unhandledRejection', (reason, p) => {
	debug('Unhandled Rejection at: Promise', p, 'reason:', reason)
	// TODO: application specific logging, throwing an error, or other logic here
})

import server from './api/server'

server.run()
