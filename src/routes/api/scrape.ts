import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';

const metascraper = await import('metascraper');

export async function scrape(targetUrl: string): Promise<void | EndpointOutput> {
	const metadata = await metascraper({ url: targetUrl });
	console.log(metadata);
}
