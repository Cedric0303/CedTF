<script lang=ts>
  import FLAGS from '../../flags.json';
  const flag = FLAGS.FLAGS[1];
  async function deleteDatabase() {
    window.open(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, "_blank");
  }
</script>

<h1>Admin</h1>
<small>{`FLAG: ${flag}`}</small>
<br /><br />
<button on:click={deleteDatabase}>Delete database</button>