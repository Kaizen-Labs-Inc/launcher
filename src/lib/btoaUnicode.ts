// source https://stackoverflow.com/a/9786592
export default function(str: string): string {
	return btoa(unescape(encodeURIComponent(str)))
}
