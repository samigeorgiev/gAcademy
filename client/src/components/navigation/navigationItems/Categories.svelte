<script>
    import NavItem from './NavItem.svelte';

    const categories = [
        {
            id: 1,
            name: 'Mathematics',
            image: 'images/tmp/math.svg',
            subCategories: [
                {
                    name: 'Math 1',
                    image: 'images/tmp/math.svg',
                },
                {
                    name: 'Math 2',
                    image: 'images/tmp/math.svg',
                }
            ]
        },
        {
            id: 2,
            name: 'Math',
            image: 'images/tmp/math.svg',
            subCategories: [
                {
                    name: 'Math 1',
                    image: 'images/tmp/math.svg',
                },
                {
                    name: 'Math 2',
                    image: 'images/tmp/math.svg',
                }
            ]
        }
    ];
</script>

<div class="nav-item-container">
    <NavItem>
        <img src="images/categories.svg" alt="categories">
        <ul slot="dropdown" class="categories">
            {#each categories as category}
                <li on:mouseenter>
                    <div class="category-icon-container">
                        <img src={category.image} alt={category.name}>
                    </div>
                    <span>{category.name}</span>
                </li>
            {/each}
        </ul>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 80%;
        margin-right: 1rem;
    }

    img {
        height: 100%;
    }

    .categories {
        width: 15rem;
        margin: 0 0 1rem;
        padding: 1rem .5rem;
        list-style: none;
    }

    .categories li {
        display: flex;
        align-items: center;
        margin-bottom: .5rem;
    }

    .categories li:last-of-type {
        margin-bottom: 0;
    }

    .categories li:hover {
        background: #eee;
        color: #007791;
        cursor: pointer;
    }

    .category-icon-container {
        display: inline-block;
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 1rem;
    }
</style>