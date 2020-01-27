import db from '../../../db'

export const findUserByEmail = email => {
	return db('users').where({ email }).first()
}
