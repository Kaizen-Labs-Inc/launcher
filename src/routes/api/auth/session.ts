import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import getAuth from '$lib/getAuth';

export async function get(event: RequestEvent) {
	const user = getAuth(event.request)
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
