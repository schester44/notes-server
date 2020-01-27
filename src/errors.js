export class AuthenticationError extends Error {
	constructor({ message = 'Unknown Authentication Error', status = 400 }) {
		super(message)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AuthenticationError)
		}

		this.type = 'AUTHENTICATION_ERROR'
		this.name = 'AuthenticationError'
		// Custom debugging information
		this.message = message
		this.status = status
		this.date = new Date()
	}
}

export class UserInputError extends Error {
	constructor({ message = 'Unknown Authentication Error', status = 400 }) {
		super(message)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UserInputError)
		}

		this.type = 'INPUT_ERROR'
		this.name = 'UserInputError'
		// Custom debugging information
		this.message = message
		this.status = status
		this.date = new Date()
	}
}