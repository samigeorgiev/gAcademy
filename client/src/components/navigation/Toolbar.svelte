<script>
    import Account from './navigationItems/Account.svelte';
    import Calendar from './navigationItems/Calendar.svelte';
    import Categories from './navigationItems/Categories.svelte';
    import Courses from './navigationItems/Courses.svelte';
    import DrawerToggle from './DrawerToggle.svelte';
    import Logo from '../UI/Logo.svelte';
    import SearchBar from './navigationItems/SearchBar.svelte';
</script>

<nav class="nav-desktop">
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

<nav class="nav-mobile">
    <DrawerToggle />
    <div class="logo-container"><Logo /></div>
    <div class="search-bar-container">
        <SearchBar />
    </div>
</nav>

<style>
    nav {
        padding: .5rem;
        height: 3rem;
        display: flex;
        justify-content: space-between;
    }

    .nav-desktop {
        display: none;
    }

    .logo-container {
        align-self: center;
        height: 80%;
        margin-left: 1rem;
    }

    .search-bar-container {
        height: 100%;
    }

    @media (min-width: 60rem) {
        .nav-mobile {
            display: none;
        }

        .nav-desktop {
            max-width: 80rem;
            margin: 0 auto;
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
    }
</style>