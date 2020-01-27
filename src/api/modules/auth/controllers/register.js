import { register } from '../models'

const registerUser = async ctx => {
	const { email, password } = ctx.request.body

	if (!email || !password) {
		ctx.throw('Missing required fields.')
	}

	const user = await register({ email, password })

	if (user) {
		ctx.response.status = 201
	} else {
		ctx.throw('Failed to create the user.')
	}
}

export default registerUser
