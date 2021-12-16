/* eslint-disable @typescript-eslint/no-var-requires */
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-clearbit')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
]);

const got = require('got');

const targetUrl =
	'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';

const fetchMetadata = async () => {
	const { body: html, url } = await got(targetUrl);
	const metadata = await metascraper({ html, url });
	console.log(metadata);
	return metadata;
};
const BAD_REQUEST = { status: 400 };
const NOT_FOUND = { status: 404 };
const metadata = {};

// const fetchMetadata = async (url: string) => {
// 	const html = await (
// 		await fetch(url, {
// 			// timeout: 5000,
// 			headers: {
// 				'User-Agent': 'request'
// 			}
// 		})
// 	).text();

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
		return {
			body: await fetchMetadata()
		};
	}
}
