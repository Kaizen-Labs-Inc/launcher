
export default function getPathParam(path: string, idx: number): string | null {
	const parts = path.split("/")
	if (parts.length < Math.abs(idx)) {
		return null
	}
	if (idx < 0) {
		return parts[parts.length + idx]
	} else {
		return parts[idx]
	}
}
