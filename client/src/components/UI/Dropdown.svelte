<script>
    export let isShown;
    export let position;
</script>

<div 
    class="dropdown"
    class:shown={isShown}
    class:right={position === 'right'}
    on:mouseenter
    on:mouseleave
>
    <slot></slot>
</div>

<style>
    .dropdown {
        display: none;
    }

    @media (min-width: 60rem) {
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

        .shown {
            display: block;
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

        .dropdown.right::after {
            left: auto;
            right: .75rem;
        }
    }
</style>