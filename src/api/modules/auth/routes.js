import register from './controllers/register'
import login from './controllers/login'
import logout from './controllers/logout'

export default {
	createRoutes: router => {
		router.post('/register', register)
		router.post('/login', login)
		router.get('/logout', logout)
	}
}
