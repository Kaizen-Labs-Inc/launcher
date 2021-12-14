export const isEmptyOrSpaces = (str) => {
	return !str || str.match(/^ *$/) !== null;
};
