<script lang="ts">
  export let data;
</script>

<h1>Leaderboard</h1>
<div>
{#each data.score as { user_id, score } (user_id)}
  <div>{user_id} - {score}</div>
{/each}
</div>