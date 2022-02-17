export async function post(req) {

	const domain = process.env['AUTH_COOKIE_DOMAIN']
	const logoutCookieWithDomain = `launcher_auth=; ${domain ? ' Domain=' + domain + ';' : ""} expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`

	return {
		status: 200,
		headers: {
			'Set-Cookie': logoutCookieWithDomain
		}
	}
}
