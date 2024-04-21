<script lang=ts>
	import { deserialize } from '$app/forms';
  import { browser } from "$app/environment";
  import FLAGS from '../../flags'
  import { onMount } from 'svelte';
  
  const flag = FLAGS.FLAGS[2];
  
  import { userStore, darkStore } from '../stores';
  let dark=false;
  let user;
  let name = '';
  let flagInput = '';
  let wrongFlag = false;
  let foundFlag = false;
  let ref;
  let ref2;
  userStore.subscribe((value) => {
    user = value;
	});
  darkStore.subscribe((value) => {
    dark = value;
	});
  
  async function logout() {
    name = '';
    userStore.update(() => null);
    localStorage.removeItem('user');
  }
  
  async function createUser(e) {
    const data = new FormData(e.currentTarget);
    const response = await fetch(`${e.currentTarget.action}`, {
			method: 'POST',
			body: data
		});
    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    const { success, user: returnUser, message } = result.data;
    if (!success) {
      window.alert(message);
      name = '';
      userStore.update(() => null);
      localStorage.removeItem('user');
    } else {
      userStore.update(() => returnUser);
      if (browser && !localStorage.getItem('user')) localStorage.setItem('user', user);
    }
  }

  async function submitFlag(e) {
    const data = new FormData(e.currentTarget);
    const response = await fetch(`${e.currentTarget.action}`, {
      method: 'POST',
			body: data
		});
    
    const result = deserialize(await response.text());
    
    const { success } = result.data;
    if (!success) {
      wrongFlag = true;
      setTimeout(() => {
        flagInput = '';
        wrongFlag = false;
      }, 10000);
      return;
    }
    foundFlag = true;
    setTimeout(() => {
      flagInput = '';
      foundFlag = false;
    }, 10000);
  }
  // onMount(() => {
  //   if (!user) ref.focus();
  //   if (user) ref2.focus();
  // });
</script>

<h1>User</h1>
{#if !user}
<br />
<form method="POST" action="?/createUser" on:submit|preventDefault={ createUser }>
  <div style="display: block;height: 20%;">
    <label for={ name }>Username: </label>
    <input bind:this={ ref } bind:value={ name } name="name" type="text" id={ name } placeholder="Enter name" style="color:{(dark) ? '#00ff41' : 'black'};">
  </div>
  {#if name}
  <button>Save</button>
  {/if}
</form>
{/if}
{#if user}
  <p>Hi { user }!</p>
  {#if user === 'god'}
  <small>{`FLAG: ${flag}`}</small>
  <br />
  {/if}
  <button on:click={logout}>Logout</button>
  <!-- {#if user !== 'god'} -->
  <br /><br /><br />
  <form method="POST" action="?/submitFlag" on:submit|preventDefault={ submitFlag }>
    <div style="display: block;height: 20%;">
      <label for={flagInput}>Submit flag: </label>
      <input bind:this={ ref2 } bind:value={ flagInput } name="flag" type="text" id={ flagInput } placeholder="Enter flag" style="color:{(dark) ? '#00ff41' : 'black'};">
      <input type="hidden" id="name" name="user" value={ user }> 
    </div>
    <button disabled={!flagInput.length}>Submit</button>
    {#if wrongFlag}
    <small style="color:red;margin-left:10px">Wrong flag!</small>
    {/if}
    {#if foundFlag}
    <small style="color:#00ff41;margin-left:10px">You found a flag!</small>
    {/if}
  </form>
  <!-- {/if} -->
{/if}

<style>
  input {
    border: 0;
    background-color: transparent;
    font-family: inherit;
    font-size: 16px;
    width: 50rem;
  }

  input:focus {
    background-color: transparent;
    border: none;
    outline: none;
  }
</style>