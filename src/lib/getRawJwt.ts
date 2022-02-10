import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default (request: ServerRequest): string | undefined => {
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
	return authJwt
}
