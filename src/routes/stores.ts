import { writable } from 'svelte/store';
import { browser } from "$app/environment";

export const userStore = writable(browser && localStorage.getItem("user") || null);

export const godStore = writable(browser && localStorage.getItem("god") || null);

export const doneStore = writable(browser && localStorage.getItem("done") || null);