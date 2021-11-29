import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';

export async function patch(request: ServerRequest): Promise<void | EndpointOutput> {

	const auth = getAuth(request)
	console.log("received patch")

	return { body: "hello, " + request.method }
}
