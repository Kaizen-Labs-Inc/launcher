import { session } from '$app/stores';

export const getGoogleUser = () => {
	let user;
	session.subscribe((value) => {
		user = value?.user?.connections?.google;
	});
	return user;
};
