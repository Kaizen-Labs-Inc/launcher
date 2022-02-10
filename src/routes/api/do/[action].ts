import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import signup from '$lib/signup';
import atobUnicode from '$lib/atobUnicode';
import type { GoogleProfile } from '@prisma/client';
import { prisma } from '$lib/prismaClient';
import btoaUnicode from '$lib/btoaUnicode';
import cookie from 'cookie';
import getRawJwt from '$lib/getRawJwt';

interface DoAction {
	type: number,
	dest?: string
}

export enum DoActionType {
	LOGIN = 0,
	SIGNUP
}

const GENERIC_ERROR = {
	headers: {
		Location:  `/auth-error?m=${btoaUnicode('An unknown error has occurred while signing up or signing in')}`,
		"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
	},
	status: 302
}

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	if (!request.params.action) {
		return GENERIC_ERROR
	}

	let action

	try {
		action = JSON.parse(atobUnicode(request.params.action))
		console.log(`Login action ${action.type} ${action.dest ? `with destination ${action.dest}` : ''}`)
	} catch (e) {
		console.error(e)
		return GENERIC_ERROR
	}

	const auth = getAuth(request)

	if (!auth) {
		console.error("No auth was included with request.")
		return GENERIC_ERROR
	}

	if (action.type === DoActionType.LOGIN.valueOf()) {
		const foundProfile: GoogleProfile | null = await prisma.googleProfile.findUnique({
			where: {
				email: auth?.user?.email,
			},
		})
		if (!foundProfile) {
			return {
				headers: {
					"Location": `/auth-error?e=${btoaUnicode(auth?.user?.email)}`,
					"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
				},
				status: 302
			}
		}
	}

	if (action.type === DoActionType.SIGNUP.valueOf()) {

		console.log("Signing up with destination " + action.dest)

		await signup(auth.user)
	}

	const domain = process.env['COOKIE_DOMAIN']

	return {
		headers: {
			"Location": action.dest || '/',
			"Set-Cookie": `svelteauthjwt=${getRawJwt(request)}; path=/; ${domain ? ' Domain=' + domain + ';' : ""} HttpOnly`
		},
		status: 302
	}
}
