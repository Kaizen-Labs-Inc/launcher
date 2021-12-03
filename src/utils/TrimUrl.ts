export const trimUrl = (url: string) => {
	return new URL(url).hostname;
};
