import {writable} from 'svelte/store';

export const token = writable(null);
export const expiresIn = writable(null);
export const accountType = writable(null);