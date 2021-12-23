// This is used for keyboard navigation of the grid

// Given the windows width in pixels, return the number of rows and columns from the channel grid
// This is based off of Tailwind's current breakpoints so it is somewhat fragile
// https://tailwindcss.com/docs/responsive-design

// A better implementation might be to import the Tailwind config directly
// and read the current breakpoint
// https://stackoverflow.com/questions/59982018/how-do-i-get-tailwinds-active-breakpoint-in-javascript

export const getGridNewFocusPosition = (
	windowSize: number,
	currentIndex: number,
	pressedKey: string,
	numChannels: number
): number => {
	const maxColsSm = 2;
	const maxColsMd = 4;
	const maxColsLg = 6;
	const minRows = 1;
	let numCols: number;
	let numRows: number;
	let newIndex: number;
	let newRowPosition: number;
	let newColPosition: number;

	if (windowSize <= 768) {
		if (numChannels < maxColsSm) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			// TODO what happens if there's a trailing row that isn't maxed out?
			numCols = maxColsSm;
			numRows = Math.ceil(numChannels / numCols);
		}
	} else if (windowSize <= 1024) {
		if (numChannels < maxColsMd) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			numCols = maxColsMd;
			numRows = Math.ceil(numChannels / numCols);
		}
	} else {
		if (numChannels < maxColsLg) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			numCols = maxColsLg;
			numRows = Math.ceil(numChannels / numCols);
		}
	}

	const remainder: number = numRows & numCols;

	// Now get the new index based on the current index
	// First figure out where in the grid the current index is
	const currentRowPosition: number = Math.floor(currentIndex + 1 / numCols);
	const currentColPosition: number = remainder * numCols;
	console.log('The current row is ', currentRowPosition);
	console.log('The current col is ', currentColPosition);

	// Figure out the new position based on user input
	if (pressedKey === 'ArrowUp') {
		if (currentRowPosition > numRows) {
			newRowPosition = currentRowPosition + 1;
			newColPosition = currentColPosition;
		}
	} else if (pressedKey === 'ArrowRight') {
		if (currentColPosition < numCols) {
			newRowPosition = currentRowPosition;
			newColPosition = currentColPosition + 1;
			// TODO jump between rows if on last column
			// TODO test this on the remainder row
		}
	} else if (pressedKey === 'ArrowDown') {
		if (currentRowPosition < numRows) {
			newRowPosition = currentRowPosition - 1;
			newColPosition = currentColPosition;
		}
	} else if (pressedKey === 'ArrowLeft') {
		if (currentColPosition > numCols) {
			newRowPosition = currentRowPosition;
			newColPosition = currentColPosition - 1;
			// TODO jump between rows if on last column
		}
	}
	console.log('The new row # is ', newRowPosition);
	console.log('The new col # is ', newColPosition);
	// Now figure out the new index on the grid based on the new row and column positions
	// Multiply rows * columns
	//
	return newIndex;
};
