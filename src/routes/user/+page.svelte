<script lang=ts>
	import { sql } from "@vercel/postgres";
  import { userStore, darkStore } from '../stores';
  let dark=false;
  let user;
  let name = '';
  userStore.subscribe((value) => {
		user = value;
	});
  darkStore.subscribe((value) => {
		dark = value;
	});


</script>

<h1>User</h1>
{#if !user}
<form method="POST">
  <div style="display: block;height: 20%;">
    <label for={name}>Username: </label>
    <input bind:value={name} id={name} placeholder="Enter name" style="color:{(dark) ? '#00ff41' : 'black'};">
  </div>
  {#if name}
  <button>Save</button>
  {/if}
</form>
{/if}
{#if user}
<p>{{user}}</p>
{/if}

<style>
  input {
    border: 0;
    background-color: transparent;
    font-family: 'Fira Mono';
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