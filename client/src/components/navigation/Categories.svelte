<script>
    export let categories;

    let list;
    let button;

    const showList = () => {
        list.style.display = "block";
        button.style.background = "#eee";
    };
    const hideList = () => {
        list.style.display = "none";
        button.style.background = "transparent";
    };
</script>

<div class="categories">
    <button
        bind:this={button}
        on:mouseover={showList}
        on:mouseout={hideList}
    >
        <img src="images/categories.svg" alt="categories">
    </button>
    <div
        class="dropdown"
        bind:this={list}
        on:mouseover={showList}
        on:mouseout={hideList}  
    >
        <ul>
            {#each categories as category}
                <li>{category}</li>
            {/each}
        </ul>
    </div>
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

    .dropdown {
        display: none;
        position: absolute;
        top: 2.75rem;
        height: 20rem;
        width: 15rem;
        background: white;
        box-shadow: -1px 1px 10px 1px rgba(0, 0, 0, .75);
        border-radius: 2px;
    }

    .dropdown::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: .75rem;
        border-width: .5rem;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>