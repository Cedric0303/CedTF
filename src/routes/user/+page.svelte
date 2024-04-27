<script lang=ts>
	import { deserialize } from '$app/forms';
  import { browser } from "$app/environment";
  import FLAGS from '../../flags'
  
  const flag = FLAGS.FLAGS[2];
  
  import { userStore, godStore } from '../stores';
  let user;
  let dark=false;
  let god;
  let name = '';
  let flagInput = '';
  let wrongFlag = false;
  let foundFlag = false;

  userStore.subscribe((value) => {
    user = value;
    if (browser && user && !localStorage.getItem('user')) localStorage.setItem('user', user);
	});
  godStore.subscribe((value) => {
    god = value;
    if (browser && god && !localStorage.getItem('god')) localStorage.setItem('god', user);
	});
  
  async function logout() {
    name = '';
    userStore.update(() => null);
    godStore.update(() => null);
    localStorage.removeItem('user');
    localStorage.removeItem('god');
  }
  
  async function login(e) {
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
      godStore.update(() => null);
      localStorage.removeItem('user');
      localStorage.removeItem('god');
      console.log(god, user)
      return;
    }
    if (returnUser === 'god') {
      godStore.update(() => returnUser);
      return;
    } else {
      userStore.update(() => returnUser);
      return;
    }
  }

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
</script>

<h1>User</h1>
{#if !(user || god === 'god')}
<br />
<form method="POST" action="?/login" on:submit|preventDefault={ login }>
  <div style="display: block;height: 20%;">
    <label for={ name }>Username: </label>
    <input bind:value={ name } name="name" type="text" id={ name } placeholder="Enter name">
  </div>
  {#if name}
  <button>Save</button>
  {/if}
</form>
{/if}
{#if god || user }
  <p>Hi { god || user }!</p>
  {#if god === 'god'}
  <small>{`FLAG: ${flag}`}</small>
  <br />
  {/if}
  <button on:click={logout}>Logout</button>
  {#if god !== 'god'}
  <br /><br /><br />
  <form method="POST" action="?/submit" on:submit|preventDefault={ submit }>
    <div style="display: block;height: 20%;">
      <label for={flagInput}>Submit flag: </label>
      <input bind:value={ flagInput } name="flag" type="text" id={ flagInput } placeholder="Enter flag">
      <input type="hidden" id="name" name="user" value={ user }> 
    </div>
    <button disabled={!flagInput.length}>Submit</button>
    {#if wrongFlag}
    <small style="color:red;margin-left:10px">Wrong flag!</small>
    {/if}
    {#if foundFlag}
    <small style="color:#00ff41;margin-left:10px">Congratulation, you found one of the flags!</small>
    {/if}
  </form>
  {/if}
{/if}

<style>
  input {
    border: 0;
    background-color: black;
    font-family: inherit;
    font-size: 16px;
    width: 50rem;
    color:white;
  }

  input:focus {
    background-color: black;
    color: white;
    border: none;
    outline: none;
  }
</style>