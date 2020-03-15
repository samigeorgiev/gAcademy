<script>
    import {fade} from 'svelte/transition';

    import Backdrop from './Backdrop.svelte';

    export let close;
</script>

<Backdrop on:click={close} />
<div class="modal" transition:fade={{duration: 200}}>
    <slot></slot>
</div>

<style>
    .modal {
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        background: #eee;
        box-shadow: -.25px .25px 10px .25px rgba(0, 0, 0, .75);
    }
</style>