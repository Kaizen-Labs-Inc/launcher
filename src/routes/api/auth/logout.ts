export async function get(req) {
	req.locals.user = null
	console.log(req.locals.user)
	return {
		status: 302,
		headers: {
			location: '/'
		}
	}
}
