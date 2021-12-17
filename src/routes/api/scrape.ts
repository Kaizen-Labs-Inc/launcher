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
		const options = { url: url, timeout: 3000 };
		return await scraper(options)
			.then((res) => {
				const data = JSON.stringify(res);
				console.log(data);
				return {
					body: data
				};
			})
			.catch((e) => {
				return e;
			});
	}
}
