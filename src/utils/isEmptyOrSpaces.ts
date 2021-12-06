export const isEmptyOrSpaces = (str) => {
	return str === null || str.match(/^ *$/) !== null;
};
