import { logoutSetCookie } from './callback/google';

export async function get(req) {
	return {
		status: 200,
		headers: {
			'Set-Cookie': logoutSetCookie
		}
	}
}
