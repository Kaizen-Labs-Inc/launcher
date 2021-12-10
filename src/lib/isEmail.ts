export default function isEmail(str: string) {
	// todo make sure all valid email characters are represented here
	return /[0-9a-zA-Z\-_\.]@[0-9a-zA-Z\-_\.].[0-9a-zA-Z\-_\.]/.test(str)
}
