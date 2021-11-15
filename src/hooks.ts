import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { appAuth } from '$lib/appAuth';
import { config } from 'dotenv';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = cookie.serialize('userid', request.locals.userid, {
			path: '/',
			httpOnly: true
		});
	}

	return response;
};



let environmentSetup = false

if (!environmentSetup) {
	console.log("Setting up environment...")
	// this sets up dotenv explicitly and is necessary to get variables
	// not prefixed with VITE_ and expose them server-side
	config()
	environmentSetup = true
}

// overriding the default session
export const { getSession } = appAuth;

