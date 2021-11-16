import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default (request: ServerRequest): any | undefined => {
	const authJwt = cookie.parse(request.headers.cookie).svelteauthjwt
	if (!authJwt) {
		return undefined
	}
	return jwt.verify(authJwt, process.env["JWT_SECRET_KEY"]);
}
