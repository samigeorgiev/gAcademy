<script>
    import Dropdown from '../UI/Dropdown.svelte';

    export let categories;

    let isDropdownShown = false;
    let button;

    const showDropdown = () => {
        isDropdownShown = true;
        button.style.background = "#eee";
    };
    const hideDropdown = () => {
        isDropdownShown = false;
        button.style.background = "transparent";
    };
</script>

<div class="categories">
    <button
        bind:this={button}
        on:mouseover={showDropdown}
        on:mouseout={hideDropdown}
    >
        <img src="images/categories.svg" alt="categories">
    </button>
    <Dropdown
        on:mouseover={showDropdown}
        on:mouseout={hideDropdown}
        isShown={isDropdownShown}
    >
        <ul>
            {#each categories as category}
                <li>{category}</li>
            {/each}
        </ul>
    </Dropdown>
</div>

<style>
    .categories {
        position: relative;
        height: 80%;
        margin-right: .5rem;
    }

    button {
        height: 100%;
        padding: .5rem;
        margin: auto;
        background: transparent;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button:hover {
        cursor: pointer;
    }

    button:focus {
        outline: none;
    }

    button img {
        height: 100%;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>