<script lang=ts>
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

  const toggleMatrix = () => {
    const matrix = document.getElementById('canvas');
    matrix.style.display = (matrix.style.display === 'none') ? 'inline' : 'none';
  }
</script>

<h1>Settings</h1>
<div class="setting">
  <div class="each-setting">Admin mode </div><button on:click={toggleAdmin}>Toggle</button>
</div>
<div class="setting">
  <div class="each-setting">Serious mode </div><button on:click={toggleSerious}>Toggle</button>
</div>

<div class="setting">
  <div class="each-setting">Matrix mode </div><button on:click={toggleMatrix}>Toggle</button>
</div>