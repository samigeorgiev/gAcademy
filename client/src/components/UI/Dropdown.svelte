<script>
    export let isShown;

    let display;
    $: display = isShown ? 'block' : 'none';
</script>

<div class="dropdown" on:mouseenter on:mouseleave style="display: {display}">
    <slot></slot>
</div>

<style>
    .dropdown {
        position: absolute;
        top: 2.75rem;
        height: 20rem;
        width: 15rem;
        background: white;
        box-shadow: -.25px .25px 10px .25px rgba(0, 0, 0, .75);
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
</style>