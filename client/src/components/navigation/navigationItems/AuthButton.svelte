<script>
    export let color;
</script>

<button on:click class:red={color === 'red'}>
    <slot></slot>
</button>

<style>
    button {
        width: 5rem;
        padding: .75rem;
        background: none;
        border: 1px solid #555;
        color: #555;
        cursor: pointer;
        font: inherit;
        font-weight: 600;
    }

    button:focus {
        outline: none;
    }

    button:first-of-type {
        margin-right: .5rem;
    }

    .red {
        color: white;
        background: red;
    }
</style>