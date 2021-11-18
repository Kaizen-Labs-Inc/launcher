
export default interface GoogleUser {
	sub: string,
	name: string,
	given_name: string,
	family_name: string,
	picture: string,
	email: string,
	email_verified: boolean,
	locale: string,
	hd: string
}
