<script>
  let dark = true;

  const toggleLight = () => {
    window.document.body.classList.toggle('light-mode')
    dark = !dark;
  }

  let showFlag = false;

	const toggleNightVision = () => {
    const meta = window.document.getElementById('meta');
    meta.style.opacity = (meta.style.opacity === '1') ? '0' : '1';
		showFlag = true;
	};
</script>

<h1>Settings</h1>

<div class="setting">
    <div class="each-setting">Dark mode </div><button on:click={toggleLight}>Toggle</button>
</div>
<!-- <div class="setting">
  <div class="each-setting">Admin mode </div><button on:click={toggleAdmin}>Toggle</button>
</div> -->
<div class="setting">
  <div class="each-setting">Night vision </div><button on:click={toggleNightVision}>Toggle</button>
</div>