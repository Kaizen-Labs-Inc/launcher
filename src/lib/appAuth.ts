import { SvelteKitAuth } from 'sk-auth';
import { GoogleOAuth2Provider } from "sk-auth/providers";
import { config } from 'dotenv';
import type { GoogleProfile } from '@prisma/client'
import { PrismaClient } from '@prisma/client';

let environmentSetup = false

const prisma = new PrismaClient()

if (!environmentSetup) {
	console.log("Setting up environment...")
	// this sets up dotenv explicitly and is necessary to get variables
	// not prefixed with VITE_ and expose them server-side
	config()
	environmentSetup = true
}

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
		async jwt(token, profile) {
			if (profile?.provider) {
				const { provider, ...account } = profile;
				console.log(profile)
				// check if user exists
				const foundProfile: GoogleProfile | null = await prisma.googleProfile.findUnique({
					where: {
						email: profile.email,
					},
				})
				if (!foundProfile) {
					console.log("Adding user " + profile.email)
					const newProfile = await prisma.googleProfile.create({
						data: profile
					})
					const newUser = await prisma.user.create({
						data: {
							googleProfileId: newProfile.id
						}
					})
				}
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
			return "/home"
		}
	},
	jwtSecret: process.env["JWT_SECRET_KEY"],
	host: process.env["BASE_URL"],
});
