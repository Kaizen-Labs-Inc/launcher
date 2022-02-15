import jwt from 'jsonwebtoken';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import atobUnicode from '$lib/atobUnicode';
import btoaUnicode from '$lib/btoaUnicode';
import type { GoogleProfile } from '@prisma/client';
import { prisma } from '$lib/prismaClient';
import signup from '$lib/signup';

const accessTokenUrl = "https://accounts.google.com/o/oauth2/token"
const profileUrl = "https://openidconnect.googleapis.com/v1/userinfo"

export async function get(request: ServerRequest) {
	const domain = process.env['AUTH_COOKIE_DOMAIN']
	const code = request.query.get('code')
	const accessTokenResp = await getAccessToken(code)
	const user = await getUser(accessTokenResp.access_token)
	let state;

	try {
		state = JSON.parse(atobUnicode(request.query.get('state')))
		console.log(`Login action ${state.type} ${state.dest ? `with destination ${state.dest}` : ''}`)
	} catch (e) {
		console.error(e)
		return GENERIC_ERROR
	}

	if (!state.type || state.type === DoActionType.LOGIN.valueOf()) {
		const foundProfile: GoogleProfile | null = await prisma.googleProfile.findUnique({
			where: {
				email: user?.email,
			},
		})
		if (!foundProfile) {
			return {
				headers: {
					"Location": `/auth-error?e=${btoaUnicode(user?.email)}`,
					"Set-Cookie": "launcher_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
				},
				status: 302
			}
		}
	}

	if (state.type === DoActionType.SIGNUP.valueOf()) {

		console.log("Signing up with destination " + state.dest)

		await signup(user)
	}


	const token = jwt.sign(user, process.env['JWT_SECRET_KEY']);

	return {
		headers: {
			"Location": state.dest || '/',
			'Set-Cookie': `launcher_auth=${token}; Path=/; ${domain ? ' Domain=' + domain + ';' : ""} HttpOnly`
		},
		status: 302
	}

}

function getAccessToken(code) {
	const clientId = process.env['GOOGLE_ID'];
	const clientSecret = process.env['GOOGLE_SECRET'];
	return fetch(accessTokenUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'authorization_code',
			redirect_uri: `${process.env["BASE_URL"]}/api/auth/callback/google`,
			code
		})
	}).then(r => r.json())
}


function getUser(accessToken) {
	return fetch(profileUrl, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then(r => r.json())
}

export enum DoActionType {
	LOGIN = 0,
	SIGNUP
}

const GENERIC_ERROR = {
	headers: {
		Location:  `/auth-error?m=${btoaUnicode('An unknown error has occurred while signing up or signing in')}`,
		"Set-Cookie": "launcher_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
	},
	status: 302
}
