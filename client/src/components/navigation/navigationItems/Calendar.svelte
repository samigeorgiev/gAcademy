<script>
    import NavItem from './NavItem.svelte';

    const nextLesson = 'tomorrow';
</script>

<div class="nav-item-container">
    <NavItem dropdownPosition="right">
        <img src="images/calendar.svg" alt="Calendar icon">
        <p slot="dropdown">{nextLesson}</p>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 80%;
        margin-right: .5rem;
    }

    img {
        height: 100%;
    }
</style>