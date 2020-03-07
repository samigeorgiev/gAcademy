<script>
    export let categories;
</script>

<div class="categories">
    <button>
        <img src="images/categories.svg" alt="categories">
    </button>
    <div class="tooltip">
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
    }

    button:hover {
        cursor: pointer;
        background: #eee;
    }

    button:focus {
        outline: none;
    }

    button img {
        height: 100%;
    }

    .tooltip {
        position: absolute;
        height: 20rem;
        width: 15rem;
        background: #ccc;
    }

    .tooltip::after {
        content: " ";
        position: absolute;
        bottom: 100%;
        left: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #ccc transparent;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>