/* eslint-disable @typescript-eslint/no-var-requires */
import type { EndpointOutput } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import scraper from 'metadata-scraper';
const BAD_REQUEST = { status: 400 };

export async function get(event: RequestEvent): Promise<void | EndpointOutput> {
	const url = event.params['url'];
	if (!url) {
		return BAD_REQUEST;
	} else {
		const options = { url: url, timeout: 3000 };
		return await scraper(options)
			.then((res) => {
				const data = JSON.stringify(res);
				return {
					body: data
				};
			})
			.catch((e) => {
				return e;
			});
	}
}
