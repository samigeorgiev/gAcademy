<script>
    import NavItem from './NavItem.svelte';

    const categories = ['Math', 'It'];
</script>

<NavItem>
    <img src="images/categories.svg" alt="categories">
    <ul slot="dropdown">
        {#each categories as category}
            <li>{category}</li>
        {/each}
    </ul>
</NavItem>

<style>
    img {
        height: 100%;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>