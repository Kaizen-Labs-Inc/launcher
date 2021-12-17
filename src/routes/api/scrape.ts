/* eslint-disable @typescript-eslint/no-var-requires */
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import scraper from 'metadata-scraper';
const BAD_REQUEST = { status: 400 };

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const url = request.query?.get('url');
	if (!url) {
		return BAD_REQUEST;
	} else {
		return await scraper(url).then((res) => {
			// TODO handle 500s and timeouts
			return {
				body: JSON.stringify(res)
			};
		});
	}
}
