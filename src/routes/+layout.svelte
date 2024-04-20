<script lang=ts>
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { inject } from '@vercel/analytics'
injectSpeedInsights();
inject();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
	<a href="/leaderboard">Leaderboard</a>
  <a href="/admin" id="meta">Admin</a>
	<a class="right" href="/user">User</a>
</nav>
  
<slot></slot>

<style>
  :global(body) {
  background-color: black;
  font-family: 'Fira Mono';
  font-variant-ligatures: normal;
  font-feature-settings: normal;
  color: #00ff41;
  transition: background-color 0.2s;
}

:global(body.light-mode) {
  background-color: white;
  color: black;
}

:global(button) {
  margin-top: 1rem;
  margin-left: 0;
  transition: background-color linear 0.2s;
}

:global(button:disabled) {
  background-color: grey;
  cursor: default;
}

:global(p) {
  width: 50%;
}

:global(a) {
  color: inherit;
}

:global(u) {
  border-bottom: 1px dashed #00ff41;
  text-decoration: none;
}

:global(body.light-mode) :global(u) {
  border-bottom: 1px dashed black;
  text-decoration: none;
}

:global(button) {
  font-family: inherit;
  background-color: #00ff41;
  border: none;
  color: black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
  margin-left: 1rem;
}

:global(body.light-mode) :global(button) {
  background-color: black;
  color: white;
}

:global(body.light-mode) :global(button:disabled) {
  background-color: grey;
  cursor: default;
}

:global(#meta) {
  display: none;
}

:global(.right) {
  float: right;
}

:global(.setting) {
  display: flex;
  margin-left: 2rem;
  margin-top: 2rem;
}

:global(.each-setting) {
  margin: auto 0;
  width: 8rem;
}

:global(footer) {
  position: absolute;
  bottom: 0;
  width: 85%;
}
</style>