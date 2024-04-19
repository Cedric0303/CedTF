<script lang="ts">
  export let data;
</script>

<div>
{#each data.scores as { user, score } (user)}
  <div>{user} - {score}</div>
{/each}
</div>