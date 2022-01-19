import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default (request: ServerRequest): any | undefined => {
	try {
		let authJwt
		if (request.headers.cookie) {
			authJwt = cookie.parse(request.headers.cookie).svelteauthjwt
		}
		if (!authJwt) {
			authJwt = request.headers["x-api-key"]
		}
		if (!authJwt) {
			return undefined
		}
		return jwt.verify(authJwt, process.env["JWT_SECRET_KEY"]);
	} catch (_) {
		return undefined
	}
}
