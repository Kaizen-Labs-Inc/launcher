import { logoutSetCookie } from './callback/google';

export async function post(req) {
	return {
		status: 200,
		headers: {
			'Set-Cookie': logoutSetCookie
		}
	}
}
