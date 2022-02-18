import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import btoaUnicode from '$lib/btoaUnicode';

const scope = ["openid", "profile", "email"];
const authorizationUrl = "https://accounts.google.com/o/oauth2/auth";

interface OauthState {
	type?: number,
	dest?: string
}

export async function get(event: RequestEvent) {

	const state: OauthState = {
		dest: event.params['dest'], // todo fixme query param
		type: event.params['type'] ? Number.parseInt(event.params['type']) : undefined
	}

	const base64State = btoaUnicode(JSON.stringify(state))
	const nonce = Math.round(Math.random() * 1000).toString();
	const data = {
		state: base64State,
		nonce: nonce,
		response_type: "code",
		client_id: process.env['GOOGLE_ID'],
		scope: scope.join(" "),
		redirect_uri: `${process.env["BASE_URL"]}/api/auth/callback/google`
	};

	return {
		status: 302,
		headers: {
			location: `${authorizationUrl}?${new URLSearchParams(data)}`
		}
	}
}
