import { AuthenticationError } from '../../../../errors'

import { login } from '../models'

const loginUser = async ctx => {
	const { email, password } = ctx.request.body

	const user = await login({ email, password })

	if (!user) {
		throw new AuthenticationError()
	}

	ctx.session.user = user
  ctx.response.status = 200
  ctx.response.body = user
}

export default loginUser
