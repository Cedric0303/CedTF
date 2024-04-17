<script>
	let visible = false;
	export let data;
	const showHint = () => {
		visible = !visible;
	};
</script>

<h1>Welcome to C<small><small><small><small><small>ed</small></small></small></small></small>TF</h1>
<h3><u>First thing first, what is a CTF?</u></h3>
<p>
	Capture the Flag (CTF) in computer security is an exercise in which participants attempt to find
	text strings, called "flags", which are secretly hidden in purposefully-vulnerable programs or
	websites. They can be used for both competitive or educational purposes.
</p>
<br />
<h3><u>How to identify flags?</u></h3>
<p>The flags have a specific format → <b>FLAG: {'{'}sequence of characters{'}'}</b></p>
<br />
<p>
	Try and find all the flags 🏳️ on this website, good luck! <small>(there are 5 in total)</small>
</p>

<br /><br /><br /><br /><br />
<button class="button" on:click={showHint}>hint</button>
{#if visible}
	<small>Inspect the page (F12)</small>
{/if}
