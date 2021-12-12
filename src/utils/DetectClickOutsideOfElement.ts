/** Dispatch event on click outside of node */
export const clickOutside = (node) => {
	const handleClick = (event) => {
		console.log(event.target);
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickOutside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
