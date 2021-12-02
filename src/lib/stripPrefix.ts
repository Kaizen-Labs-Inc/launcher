export default function stripPrefix(url: string) {
	return url.replace(/(^\w+:|^)\/\//, '').replace(/^([w0-9]+)\./, '');
}
