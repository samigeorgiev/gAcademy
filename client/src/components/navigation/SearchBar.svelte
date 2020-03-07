<script>
    import {createEventDispatcher} from 'svelte';

    export let value = '';

    const dispatch = createEventDispatcher();

    const submit = () => dispatch('submit', {value});
</script>

<div class="search-bar">
    <input type="text" placeholder="Find your passion" bind:value on:change />
    <button on:click={submit}>S</button>
</div>

<style>
    .search-bar {
        display: inline-flex;
        align-items: center;
        height: 100%;
        width: 30rem;
        margin: auto 0;
        background: #eee;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .search-bar:focus-within {
        background: white;
        border-color: #eee;
    }

    input {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: .25rem;
        border: none;
        background: transparent;
    }

    input:focus {
        outline: none;
    }

    button {
        height: 100%;
        background: transparent;
        border: none;
    }

    button:focus {
        outline: none;
    }
</style>