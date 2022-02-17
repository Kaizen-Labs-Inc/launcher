// https://timdeschryver.dev/blog/environment-variables-with-sveltekit#the-problem
export const variables = {
	segmentKey: import.meta.env.VITE_SEGMENT_KEY,
	externalHeaderLinks: import.meta.env.VITE_EXTERNAL_HEADER_LINKS,
	modeOSS: import.meta.env.VITE_MODE_OSS,
	logoutUrl: import.meta.env.VITE_LOGOUT_URL
};
