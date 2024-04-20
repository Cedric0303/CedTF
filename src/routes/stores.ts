import { writable } from 'svelte/store';
import { browser } from "$app/environment";

export const userStore = writable(browser && localStorage.getItem("user") || null);

export const darkStore = writable(true);