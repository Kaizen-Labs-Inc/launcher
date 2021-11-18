export const clickOutsideOfElement = (element: HTMLElement) => {
	document.addEventListener('click', function (event: any) {
		const isClickInside: boolean = element.contains(event.target);

		if (!isClickInside) {
			return true;
		} else {
			return false;
		}
	});
};
