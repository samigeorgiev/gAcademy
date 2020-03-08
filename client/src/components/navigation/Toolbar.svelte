<script>
    import Categories from './Categories.svelte';
    import Courses from './Courses.svelte';
    import Logo from '../UI/Logo.svelte';
    import SearchBar from './SearchBar.svelte';

    // export let segment;

    const categories = ["Math", "IT"];
    const courses = ["1st", "2nd"];

    let searchValue;
    const searchSubmit = event => console.log(event);
</script>

<nav>
    <div class="logo-container">
        <a href="/"><Logo /></a>
    </div>
    <div class="navigation-container">
        <Categories {categories} />
        <div class="search-bar-container">
            <SearchBar bind:value={searchValue} on:submit={searchSubmit} />
        </div>
    </div>
    <div class="account-container">
        <Courses {courses} />
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