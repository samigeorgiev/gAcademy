<script>
    import LogIn from '../../auth/LogIn.svelte';

    let isLoginShown = false;
    const showLogIn = () => isLoginShown = true;
    const hideLogIn = () => isLoginShown = false;
</script>

{#if isLoginShown}
    <LogIn close={hideLogIn} />
{/if}
<button on:click={showLogIn}>
    Log in
</button>

<style>
    button {
        width: 5rem;
        padding: .75rem;
        margin-right: .5rem;
        background: none;
        border: 1px solid #555;
        color: #555;
        cursor: pointer;
        font: inherit;
        font-weight: 600;
    }

    button:focus {
        outline: none;
    }
</style>