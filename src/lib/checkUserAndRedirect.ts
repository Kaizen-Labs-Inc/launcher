import { goto } from '$app/navigation';
import type { UserStatus } from 'src/stores/userStore';

export default function checkUserAndRedirect(value: UserStatus) {
	if (!value.user && !value.loading) {
		goto('/');
	}
}
