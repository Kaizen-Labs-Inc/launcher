import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';

export async function post(_: RequestEvent): Promise<void | EndpointOutput> {

	const domain = process.env['AUTH_COOKIE_DOMAIN']
	const logoutCookieWithDomain = `launcher_auth=;${ domain ? ' Domain=' + domain + ';' : "" } Path=/; Max-Age=0; HttpOnly`

	return {
		status: 200,
		headers: {
			'Set-Cookie': logoutCookieWithDomain
		}
	}
}
