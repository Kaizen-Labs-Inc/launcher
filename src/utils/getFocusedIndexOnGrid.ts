// This is used for keyboard navigation of the grid

// Given the windows width in pixels, return the number of rows and columns from the channel grid
// This is based off of Tailwind's current breakpoints so it is somewhat fragile
// https://tailwindcss.com/docs/responsive-design

// A better implementation might be to import the Tailwind config directly
// and read the current breakpoint
// https://stackoverflow.com/questions/59982018/how-do-i-get-tailwinds-active-breakpoint-in-javascript

export const getFocusedIndexOnGrid = (
	windowSize: number,
	currentIndex: number,
	pressedKey: string,
	numChannels: number
): number => {
	const maxColsSm = 2;
	const maxColsMd = 4;
	const maxColsLg = 6;
	const minRows = 1;
	const index = currentIndex + 1; // adjust for zero-based index
	let numCols: number;
	let numRows: number;
	let newRowPosition: number;
	if (windowSize <= 768) {
		if (numChannels <= maxColsSm) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			// TODO what happens if there's a trailing row that isn't maxed out?
			numCols = maxColsSm;
			numRows = Math.ceil(numChannels / numCols);
		}
	} else if (windowSize <= 1024) {
		if (numChannels <= maxColsMd) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			numCols = maxColsMd;
			numRows = Math.ceil(numChannels / numCols);
		}
	} else {
		if (numChannels <= maxColsLg) {
			numCols = numChannels;
			numRows = minRows;
		} else {
			numCols = maxColsLg;
			numRows = Math.ceil(numChannels / numCols);
		}
	}

	const currentRowPosition: number = Math.ceil(index / numCols);
	const currentColPosition: number = index % numCols === 0 ? numCols : index % numCols;
	if (pressedKey === 'ArrowUp') {
		if (currentRowPosition > 1) {
			newRowPosition = currentRowPosition - 1;
		} else {
			newRowPosition = 1;
		}
	} else if (pressedKey === 'ArrowDown') {
		if (currentRowPosition < numRows) {
			newRowPosition = currentRowPosition + 1;
		} else {
			newRowPosition = numRows;
		}
	}
	console.log('From row ' + currentRowPosition + ' to row ' + newRowPosition);

	// Now figure out the new index on the grid based the existing column # and new row #
	// We have the current index, the column number, the old row number, the new row number, and the # of channels
	// (currentrow * totalCols) + currentcol
	const newIndex = (newRowPosition - 1) * numCols + (currentColPosition - 1);
	// 0,0
	// 1 * 4 + 0 = 4
	console.log(newIndex + ' = ' + newRowPosition + ' * ' + numCols + ' + ' + currentColPosition);
	return newIndex;
};
