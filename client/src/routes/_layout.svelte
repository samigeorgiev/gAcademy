<script>
	import Toolbar from '../components/navigation/Toolbar.svelte';

	// export let segment;
</script>

<header>
	<Toolbar />
</header>

<main>
	<slot></slot>
</main>

<style>
	header {
        border-bottom: 2px solid #aaa;
	}
</style>