<script>
    import Categories from './items/Categories.svelte';
    import Courses from './items/Courses.svelte';
    import Logo from '../UI/Logo.svelte';
    import SearchBar from './items/SearchBar.svelte';
</script>

<nav>
    <div class="logo-container">
        <a href="/"><Logo /></a>
    </div>
    <div class="navigation-container">
        <Categories />
        <div class="search-bar-container">
            <SearchBar />
        </div>
    </div>
    <div class="account-container">
        <Courses />
    </div>
</nav>

<style>
    nav {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #aaa;
    }

    .logo-container {
        height: 60%;
        margin-left: 1rem;
    }

    .navigation-container {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .search-bar-container {
        height: 75%;
    }
</style>