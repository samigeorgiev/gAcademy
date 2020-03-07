<script>
	import Toolbar from '../components/navigation/Toolbar.svelte';

	export let segment;
</script>

<header>
	<Toolbar {segment} />
</header>

<main>
	<slot></slot>
</main>