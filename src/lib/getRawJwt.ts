import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import cookie from 'cookie';

export default (request: ServerRequest): string | undefined => {
	let authJwt
	if (request.headers.cookie) {
		authJwt = cookie.parse(request.headers.cookie).launcher_auth
	}
	if (!authJwt) {
		authJwt = request.headers["x-api-key"]
	}
	if (!authJwt) {
		return undefined
	}
	return authJwt
}
