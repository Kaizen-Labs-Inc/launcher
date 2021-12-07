// https://timdeschryver.dev/blog/environment-variables-with-sveltekit#the-problem
export const variables = {
	segmentKey: import.meta.env.VITE_SEGMENT_KEY
};
