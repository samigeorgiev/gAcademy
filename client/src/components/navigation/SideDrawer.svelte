<script>
    import {fly} from 'svelte/transition';

    import Backdrop from '../UI/Backdrop.svelte';

    export let close;
</script>

<Backdrop on:click={close} />
<div class="side-drawer" transition:fly={{x: -200}}>
    <slot></slot>
</div>

<style>
    .side-drawer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 20rem;
        background: white;
    }
</style>