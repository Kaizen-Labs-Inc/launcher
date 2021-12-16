/* eslint-disable @typescript-eslint/no-var-requires */
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import scraper from 'metadata-scraper';
const BAD_REQUEST = { status: 400 };
const NOT_FOUND = { status: 404 };

// const fetchMetadata = async (url: string) => {
// 	const html = await (
// 		await fetch(url, {
// 			// timeout: 5000,
// 			headers: {
// 				'User-Agent': 'request'
// 			}
// 		})
// 	).text();
// 	console.log(url, html);
// 	html.replace(/<meta.+(property|name)="(.*?)".+content="(.*?)".*\/>/gim, (m, p0, p1, p2) => {
// 		metadata[p1] = decode(p2);
// 	});
// 	console.log(metadata);
// 	return metadata;
// };

// const decode = (str) => {
// 	str.replace(/&#(\d+);/g, function (match, dec) {
// 		return String.fromCharCode(dec);
// 	});
// };

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const url = request.query?.get('url');
	if (!url) {
		return BAD_REQUEST;
	} else {
		console.log(url);
		return await scraper(url).then((data) => {
			console.log(data);
			return {
				body: data
			};
		});
	}
}
