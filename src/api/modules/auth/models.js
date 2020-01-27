import db from '../../../db'
import { UserInputError, AuthenticationError } from '../../../errors'

import { findUserByEmail } from '../user/models'

const bcrypt = require('bcrypt')

const hashPassword = password => {
	return new Promise((resolve, reject) =>
		bcrypt.hash(password, 10, (err, hash) => {
			err ? reject(err) : resolve(hash)
		})
	)
}

const createUser = user => {
	return db
		.raw(
			'INSERT INTO users (email, password, created_at) VALUES (?, ?, ?) RETURNING id, email, created_at',
			[user.email, user.password, new Date()]
		)
		.then(data => data.rows[0])
}

export const register = async ({ email, password }) => {
	const hashedPassword = await hashPassword(password)

	const user = {
		email,
		password: hashedPassword
	}

	return createUser(user)
}

export const login = async ({ email, password }) => {
	if (!email || !password) {
		throw new UserInputError({ message: 'Missing required fields.' })
	}

	const user = await findUserByEmail(email)

	if (!user) {
		throw new AuthenticationError({ message: 'User does not exist' })
	}

	const valid = await bcrypt.compare(password, user.password)

	if (!valid) {
		throw new UserInputError({ message: 'Invalid username/password' })
	}

	delete user.password
	delete user.reset_password_token

	return user
}
