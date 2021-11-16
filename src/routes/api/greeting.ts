import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const decode = getAuth(request)
	return {
		body: { hello: decode.user || "world" },
	};
}
