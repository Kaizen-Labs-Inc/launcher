export interface ClickOutsideParameters {
	exclusionFilter: (node: Node) => boolean;
}
/** Dispatch event on click outside of node */
export const clickOutside = (node: Node, parameters: ClickOutsideParameters) => {
	const handleClick = (event) => {
		if (
			node &&
			!node.contains(event.target) &&
			!event.defaultPrevented &&
			!(parameters.exclusionFilter && parameters.exclusionFilter(event.target))
		) {
			node.dispatchEvent(new CustomEvent('clickOutside', node));
		}
	};

	document.addEventListener('mousedown', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('mousedown', handleClick, true);
		}
	};
};
