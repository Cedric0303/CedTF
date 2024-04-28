<script lang=ts>
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { inject } from '@vercel/analytics'

injectSpeedInsights();
inject();

import { deserialize } from '$app/forms';
import { browser } from "$app/environment";
import { onMount } from "svelte";
import { userStore, godStore } from './stores';

let user;
let god;
let flagInput = '';
let wrongFlag = false;
let foundFlag = false;

userStore.subscribe((value) => {
  user = value;
  if (browser && user && !localStorage.getItem('user')) localStorage.setItem('user', user);
});
godStore.subscribe((value) => {
  god = value;
  if (browser && god && !localStorage.getItem('god')) localStorage.setItem('god', god);
});

async function submit(e) {
  const data = new FormData(e.currentTarget);
  const response = await fetch(`${e.currentTarget.action}`, {
    method: 'POST',
    body: data
  });
  
  const result = deserialize(await response.text());
  
  const { success } = result.data;

  if (!success) {
    wrongFlag = true;
    foundFlag = false;
    setTimeout(() => {
      flagInput = '';
      wrongFlag = false;
    }, 8000);
    return;
  }
  foundFlag = true;
  wrongFlag = false;
  setTimeout(() => {
    flagInput = '';
    foundFlag = false;
  }, 8000);
  }

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
{#if user}
  <form method="POST" action="user?/submit" on:submit|preventDefault={ submit }>
    <div style="display: block;height: 20%;">
      <label for={flagInput}>Submit flag: </label>
      <input bind:value={ flagInput } name="flag" type="text" id={ flagInput } placeholder="Enter flag">
      <input type="hidden" id="name" name="user" value={ user }> 
      <button disabled={!flagInput.length}>Submit</button>
      {#if wrongFlag}
        <small style="color:red;margin-left:10px">Wrong flag!</small>
      {/if}
      {#if foundFlag}
        <small style="color:#00ff41;margin-left:10px">Congratulation, you found one of the flags!</small>
      {/if}
    </div>
  </form>
{/if}
  
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

:global(nav > a) {
  font-size: 20px;
  margin: 0 10px 10px 0;
}

:global(body) {
  background-color: black;
  font-family: 'Fira Mono';
  font-variant-ligatures: normal;
  font-feature-settings: normal;
  color: #00ff41;
  transition: background-color 0.2s;
  margin: 10px;
  height: 100%;
  width: 99%;
  overflow: hidden;
  /* padding: 10px; */
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
  padding-bottom: 20px;
  padding-right: 20px;
}

:global(input) {
  border: 0;
  background-color: black;
  font-family: inherit;
  font-size: 16px;
  width: 20rem;
  color:white;
}

:global(input:focus) {
  background-color: black;
  color: white;
  border: none;
  outline: none;
}

:global(.errorImage) {
  justify-content: center;
  text-align: center;
}

:global(.leaderboard) {
  margin-top: 2%;
  margin-left: 2%;
}
</style>