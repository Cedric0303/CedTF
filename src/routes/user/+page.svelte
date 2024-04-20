<script lang=ts>
	import { enhance } from '$app/forms';
  import { browser } from "$app/environment";

  import { userStore, darkStore } from '../stores';
  let dark=false;
  let user;
  let name = '';
  let flag = '';
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
</script>

<h1>User</h1>
{#if !user}
<br />
<form method="POST" use:enhance={async () => {
  return async ({ result }) => {
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
}}
>
  <div style="display: block;height: 20%;">
    <label for={name}>Username: </label>
    <input bind:value={name} name="name" type="text" id={name} placeholder="Enter name" style="color:{(dark) ? '#00ff41' : 'black'};">
  </div>
  {#if name}
  <button>Save</button>
  {/if}
</form>
{/if}
{#if user}
<p>Hi { user }!</p>
{#if user === 'god'}
<p>FLAG: play1ng_g0d_p0lyph1a</p>
{/if}
<button on:click={logout}>Logout</button>
<br />
<br />
<br />
<form method="POST" use:enhance={async () => {
  return async ({ result }) => {
    // const { success, user: returnUser, message } = result.data;
    // if (!success) {
    //   window.alert(message);
    //   name = '';
    //   userStore.update(() => null);
    // } else {
    //   userStore.update(() => returnUser);
    // }
  }
}}
>
  <div style="display: block;height: 20%;">
    <label for={flag}>Submit flag: </label>
    <input bind:value={flag} name="flag" type="text" id={flag} placeholder="Enter flag" style="color:{(dark) ? '#00ff41' : 'black'};">
  </div>
  {#if flag}
  <button>Submit</button>
  {/if}
</form>
{/if}

<style>
  input {
    border: 0;
    background-color: transparent;
    font-family: 'Fira Mono';
    font-size: 16px;
    width: 50rem;
  }
  input:focus {
  background-color: transparent;
  border: none;
  outline: none;
}
  button {
    margin-top: 2rem;
    margin-left: 0;
  }
</style>