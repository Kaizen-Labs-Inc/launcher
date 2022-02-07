import { appAuth } from '$lib/appAuth';

// overriding the default session
export const { getSession } = appAuth;

