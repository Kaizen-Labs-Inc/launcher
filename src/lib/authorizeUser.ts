import { goto } from '$app/navigation';
import { userStore } from '../stores/userStore';

let user;
userStore.subscribe((value) => {
	user = value;
});

export const authorizeUser = () => {
	console.log(user); // undefined. likely hasn't loaded yet
	if (!user) {
		goto('/');
	}
};
