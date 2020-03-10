<script>
    import NavItem from './NavItem.svelte';

    const imageSrc = 'images/tmp/acc.png';
</script>

<div class="nav-item-container">
    <NavItem dropdownPosition="right">
        <img src={imageSrc} alt="Samuil picture">
        <p slot="dropdown">Samuil</p>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 100%;
    }

    img {
        height: 100%;
        border-radius: 50%;
    }
</style>