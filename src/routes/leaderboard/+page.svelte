<script lang="ts">
  import { userStore } from '../stores';
	let user;
	userStore.subscribe((value) => {
		user = value;
	})

  export let data;
</script>

<h1>Leaderboard</h1>
<div class="leaderboard">
{#each data.score as { user_id, score } (user_id)}
  <div style={(user_id === user) ? "font-weight: bold; text-decoration: underline;": ""}>{user_id} - {score}</div>
  <br />
{/each}
</div>
