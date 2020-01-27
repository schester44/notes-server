import Knex from 'knex'

import knexfile from '../knexfile'

const config = knexfile[process.env.NODE_ENV || 'development']

const knex = Knex(config)

export const testConnection = () => {
	return knex.raw('select 1+1 as result')
}

export default knex
