<script lang=ts>

  import { darkStore } from '../stores';
  let dark;

  darkStore.subscribe((value) => {
    dark = value;
  })
  
  const toggleLight = () => {
    window.document.body.classList.toggle('light-mode')
    dark = !dark;
    darkStore.set(dark);
    console.log('set')
  }

	const toggleAdmin = () => {
    const meta = window.document.getElementById('meta');
    meta.style.display = (meta.style.display === 'inline') ? 'none' : 'inline';
	};

  const toggleSerious = () => {
    const body = document.body;
    if (!body.style.fontFamily.length) {
      body.style.fontFamily = 'Comic Sans MS';
      return;
    }
    body.style.fontFamily = (body.style.fontFamily === 'Fira Mono') ? 'Comic Sans MS' : 'Fira Mono';
	};
</script>

<h1>Settings</h1>

<div class="setting">
    <div class="each-setting">Dark mode </div><button on:click={toggleLight}>Toggle</button>
</div>
<div class="setting">
  <div class="each-setting">Admin mode </div><button on:click={toggleAdmin}>Toggle</button>
</div>
<div class="setting">
  <div class="each-setting">Serious mode </div><button on:click={toggleSerious}>Toggle</button>
</div>