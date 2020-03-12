<script>
    // TODO dropdown style
    import NavItem from './NavItem.svelte';

    const imageSrc = 'images/tmp/acc.png';
</script>

<div class="nav-item-container">
    <NavItem dropdownPosition="right">
        <div class="user">
            <img src={imageSrc} alt="Samuil picture">
            <p>Samuil</p>
        </div>
        <p slot="dropdown">Samuil</p>
    </NavItem>
</div>

<style>
    .nav-item-container {
        width: 100%;
        height: 5rem;
    }

    .user {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 90%;
        margin: 0 auto;
        padding-bottom: .75rem; 
        border-bottom: 1px solid #ccc;
        font-size: 1.5rem;
    }

    .user img {
        display: block;
        height: 100%;
        margin-right: .5rem;
        border-radius: 50%;
    }

    @media (min-width: 60rem) {
        .nav-item-container {
            width: auto;
            height: 100%;
        }

        .user {
            display: block;
            margin: 0;
            padding: 0;
            border: none;
        }

        .user img {
            margin: 0;
        }

        .user p {
            display: none;
        }
    }
</style>