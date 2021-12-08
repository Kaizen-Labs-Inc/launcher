import { SvelteKitAuth } from 'sk-auth';
import { GoogleOAuth2Provider } from 'sk-auth/providers';
import { config } from 'dotenv';

let environmentSetup = false;

if (!environmentSetup) {
	console.log('Setting up environment...');
	// this sets up dotenv explicitly and is necessary to get variables
	// not prefixed with VITE_ and expose them server-side
	config();
	environmentSetup = true;
}

export const appAuth = new SvelteKitAuth({
	providers: [
		new GoogleOAuth2Provider({
			clientId: process.env['GOOGLE_ID'],
			clientSecret: process.env['GOOGLE_SECRET'],
			profile(profile) {
				return { ...profile, provider: 'google' };
			}
		})
	],
	callbacks: {
		jwt(token, profile) {
			if (profile?.provider) {
				const { provider, ...account } = profile;
				token = {
					...token,
					user: {
						...(token.user ?? {}),
						connections: { ...(token.user?.connections ?? {}), [provider]: account }
					}
				};
			}

			return token;
		},
		redirect(url: string) {
			return '/home';
		}
	},
	jwtSecret: process.env['JWT_SECRET_KEY'],
	host: process.env['BASE_URL']
});
