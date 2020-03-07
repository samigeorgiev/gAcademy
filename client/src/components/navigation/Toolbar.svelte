<script>
    import Logo from '../UI/Logo.svelte';
    import SearchBar from './SearchBar.svelte';

    // export let segment;

    let searchValue;
    const searchSubmit = event => console.log(event);
</script>

<nav>
    <div class="logo-container"><Logo /></div>
    <div class="search-bar-container">
        <SearchBar bind:value={searchValue} on:submit={searchSubmit} />
    </div>
</nav>

<style>
    nav {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid #aaa;
    }

    .logo-container {
        height: 60%;
        margin-right: 1rem;
    }

    .search-bar-container {
        height: 75%;
    }
</style>