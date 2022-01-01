import type { GoogleProfile } from '@prisma/client';
import { prisma } from '$lib/prismaClient';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import atobUnicode from '$lib/btoaUnicode';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)
	// check if user exists
	const foundProfile: GoogleProfile | null = await prisma.googleProfile.findUnique({
		where: {
			email: auth?.user?.email,
		},
	})
	if (!foundProfile) {
		return {
			headers: {
				"Location": `/auth-error?e=${atobUnicode(auth?.user?.email)}`,
				"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
			},
			status: 302
		}
	}
	return {
		headers: { Location: '/' },
		status: 302
	}
}
