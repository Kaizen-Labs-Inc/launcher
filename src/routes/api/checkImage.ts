import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

const BAD_REQUEST = { status: 400 };

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const imageUrl = request.query?.get('url');
	if (!imageUrl) {
		return BAD_REQUEST;
	} else {
		return fetch(imageUrl, { method: 'HEAD' })
			.then((res) => {
				if (res.ok) {
					return {
						body: { status: 200 }
					};
				} else {
					return {
						body: { status: 404 }
					};
				}
			})
			.catch((err) => console.error('Error:', err));
	}
}
