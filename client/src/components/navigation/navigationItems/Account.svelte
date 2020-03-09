<script>
    import NavItem from './NavItem.svelte';

    const imageSrc = 'images/tmp.png';
</script>

<div class="nav-item-container">
    <NavItem>
        <img src={imageSrc} alt="Samuil picture">
        <p slot="dropdown">Samuil</p>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 100%;
        margin-right: .5rem;
    }

    img {
        height: 100%;
        border-radius: 50%;
    }
</style>