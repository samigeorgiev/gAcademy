<script>
    import Account from './navigationItems/Account.svelte';
    import Calendar from './navigationItems/Calendar.svelte';
    import Categories from './navigationItems/Categories.svelte';
    import Courses from './navigationItems/Courses.svelte';
    import Logo from '../UI/Logo.svelte';
    import SearchBar from './navigationItems/SearchBar.svelte';
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
        <Calendar />
        <Account />
    </div>
</nav>

<style>
    nav {
        height: 3rem;
        max-width: 80rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }

    .logo-container {
        align-self: center;
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

    .account-container {
        display: flex;
        align-items: center;
        height: 100%;
    }
</style>