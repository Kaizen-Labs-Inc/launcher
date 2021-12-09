import { writable } from 'svelte/store';
import type Organization from '../model/Organization';

export const organizationStore = writable<OrganizationStatus>({ loading: true, organization: undefined });

export interface OrganizationStatus {
	loading: boolean;
	organization?: Organization;
}
