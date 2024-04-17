<script>
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
injectSpeedInsights();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
	<a class="right" href="/login">Login</a>
</nav>
<div id="meta">
	<small>FLAG: brav0_s1x_g01ng_dark</small>
</div>

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
  font-family: 'Fira Mono';
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

:global(#meta) {
  opacity: 0;
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
</style>