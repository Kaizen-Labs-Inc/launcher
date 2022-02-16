import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import getAuth from '$lib/getAuth';

export async function get(request: ServerRequest) {
	const user = getAuth(request)
	if (!user) {
		return {
			status: 401
		}
	}
	return {
		status: 200,
		body: user
	}
}
