import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	console.log(JSON.stringify(request))
	return {
		body: { hello: process.env["BASE_URL"] || "world" },
	};
}
