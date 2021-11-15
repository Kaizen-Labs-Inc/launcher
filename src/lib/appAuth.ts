import { SvelteKitAuth } from "sk-auth";
import { GoogleOAuth2Provider } from "sk-auth/providers";

export const appAuth = new SvelteKitAuth({
	providers: [
		new GoogleOAuth2Provider({
			clientId: process.env["GOOGLE_ID"],
			clientSecret: process.env["GOOGLE_SECRET"],
			profile(profile) {
				console.log("processing google profile " + JSON.stringify(profile))
				return { ...profile, provider: "google" };
			},
		}),
	],
	callbacks: {
		jwt(token, profile) {
			if (profile?.provider) {
				const { provider, ...account } = profile;
				token = {
					...token,
					user: {
						...(token.user ?? {}),
						connections: { ...(token.user?.connections ?? {}), [provider]: account },
					},
				};
			}

			return token;
		},
		redirect(url: string) {
			return "/"
		}
	},
	jwtSecret: process.env["JWT_SECRET_KEY"],
});
