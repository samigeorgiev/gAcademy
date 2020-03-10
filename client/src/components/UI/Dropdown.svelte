<script>
    export let isShown;
    export let position;

    let display;
    $: display = isShown ? 'block' : 'none';
</script>

<div 
    class="dropdown {position}"
    on:mouseenter
    on:mouseleave
    style="display: {display}"
>
    <slot></slot>
</div>

<style>
    .dropdown {
        position: absolute;
        top: 2.75rem;
        background: white;
        box-shadow: -.25px .25px 10px .25px rgba(0, 0, 0, .75);
        border-radius: 2px;
    }

    .dropdown.right {
        right: 0;
    }

    .dropdown::after {
        content: "";
        position: absolute;
        bottom: 100%;
        border-width: .5rem;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }

    .dropdown.left::after {
        left: .75rem;
    }

    .dropdown.right::after {
        right: .75rem;
    }
</style>