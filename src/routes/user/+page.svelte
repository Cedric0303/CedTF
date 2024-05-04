<script lang=ts>
	import { deserialize } from '$app/forms';
  import { browser } from "$app/environment";
  import FLAGS from '../../flags'
  
  const flag = FLAGS.FLAGS[2];
  
  import { userStore, godStore, doneStore } from '../stores';
  let user;
  let god;
  let done;
  let name = '';

  userStore.subscribe((value) => {
    user = value;
    if (browser && user) localStorage.setItem('user', user);
	});
  godStore.subscribe((value) => {
    god = value;
    if (browser && god) localStorage.setItem('god', god);
	});
  doneStore.subscribe((value) => {
    done = value;
    if (browser && done) localStorage.setItem('done', done);
	});
  
  async function logout() {
    name = '';
    userStore.update(() => null);
    godStore.update(() => null);
    localStorage.removeItem('user');
    localStorage.removeItem('god');
    localStorage.removeItem('done');
  }
  
  async function login(e) {
    const data = new FormData(e.currentTarget);
    const response = await fetch(`${e.currentTarget.action}`, {
			method: 'POST',
			body: data
		});
    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    const { success, user: returnUser, message, done } = result.data;
    if (!success) {
      window.alert(message);
      name = '';
      userStore.update(() => null);
      godStore.update(() => null);
      doneStore.update(() => null);
      localStorage.removeItem('user');
      localStorage.removeItem('god');
      localStorage.removeItem('done');
      return;
    }
    if (returnUser === 'god') {
      godStore.update(() => returnUser);
    } else {
      userStore.update(() => returnUser);
    }
    if (done) {
      doneStore.update(() => 'true');
    } else {
      doneStore.update(() => null)
    }
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