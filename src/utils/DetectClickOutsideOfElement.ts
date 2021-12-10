/** Dispatch event on click outside of node */
export function clickOutside(node, exceptionNodeIds) {
	const handleClick = (event) => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented &&
			!exceptionNodeIds.includes(event.target.id)
			// event.target.tagName !== 'svg' &&
			// event.target.tagName !== 'BUTTON' // 5UP3RH4CK for add channel popover
		) {
			node.dispatchEvent(new CustomEvent('clickOutside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
