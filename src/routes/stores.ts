import { writable } from 'svelte/store';

export const userStore = writable(null);

export const darkStore = writable(true);