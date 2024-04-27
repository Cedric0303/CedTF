<script lang=ts>
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { inject } from '@vercel/analytics'
import { browser } from "$app/environment";
import { onMount } from "svelte";

import { userStore, godStore } from './stores';

injectSpeedInsights();
inject();

onMount(() => {
    if (browser && localStorage.getItem('user')) {
      userStore.update(() =>  localStorage.getItem('user'));
    }
    if (browser && localStorage.getItem('god')) {
      godStore.update(() =>  localStorage.getItem('god'));
    }
  })
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
	<a href="/leaderboard">Leaderboard</a>
  <a href="/admin" id="meta">Admin</a>
	<a class="right" href="/user">User</a>
</nav>
  
<slot></slot>

<style>
:global(#canvas) {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -10000;
  height: 100vh;
  opacity: 50%;
}


:global(body) {
  background-color: black;
  font-family: 'Fira Mono';
  font-variant-ligatures: normal;
  font-feature-settings: normal;
  color: #00ff41;
  transition: background-color 0.2s;
  margin:0;
  padding:0;
  height:100%;
  width:100%;
  overflow: hidden;
}

:global(button) {
  margin-top: 1rem;
  margin-left: 0;
  transition: background-color linear 0.2s;
}

:global(button:disabled) {
  background-color: grey;
  cursor: default;
}

:global(p) {
  width: 50%;
}

:global(a) {
  color: inherit;
}

:global(u) {
  border-bottom: 1px dashed #00ff41;
  text-decoration: none;
}

:global(button) {
  font-family: inherit;
  background-color: #00ff41;
  border: none;
  color: black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
  margin-left: 1rem;
}

:global(#meta) {
  display: none;
}

:global(.right) {
  float: right;
}

:global(.setting) {
  display: flex;
  margin-left: 2rem;
  margin-top: 2rem;
}

:global(.each-setting) {
  margin: auto 0;
  width: 8rem;
}

:global(footer) {
  position: absolute;
  bottom: 0;
  width: 30%;
  right: 0;
  text-align: right;
}
</style>