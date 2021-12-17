import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
const BAD_REQUEST = { status: 400 };

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const imageUrl = request.query?.get('url');
	if (!imageUrl) {
		return BAD_REQUEST;
	} else {
		fetch(imageUrl, { method: 'HEAD' })
			.then((res) => {
				if (res.ok) {
					console.log('Image exists.');
					return {
						body: { status: 200 }
					};
				} else {
					console.error('Image does not exist.');
					return {
						body: { status: 404 }
					};
				}
			})
			.catch((err) => console.error('Error:', err));
	}
}
