import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import jwt from 'jsonwebtoken';
import getRawJwt from '$lib/getRawJwt';

export default (request: ServerRequest): any | undefined => {
	try {
		const authJwt = getRawJwt(request)
		return jwt.verify(authJwt, process.env["JWT_SECRET_KEY"]);
	} catch (_) {
		return undefined
	}
}
