<script>
	import LogIn from '../components/auth/LogIn.svelte';
	import SignUp from '../components/auth/SignUp.svelte';
	import Toolbar from '../components/navigation/Toolbar.svelte';

	let shownAuth = null;
	const showLogIn = () => shownAuth = 'logIn';
	const showSignUp = () => shownAuth = 'signUp';
	const closeAuth = () => shownAuth = null;
</script>

<header>
	<Toolbar {showLogIn} {showSignUp} />
</header>

<main>
	{#if shownAuth === 'logIn'}
		<LogIn close={closeAuth} />
	{:else if shownAuth === 'signUp'}
		<SignUp close={closeAuth} />
	{/if}
	<slot></slot>
</main>

<style>
	header {
        border-bottom: 2px solid #aaa;
	}
</style>