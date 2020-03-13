<script>
    //TODO style dropdown
    import NavItem from './NavItem.svelte';

    const courses = ['1st', '2nd'];
</script>

<div class="nav-item-container">
    <NavItem dropdownPosition="right">
        <div class="content">
            <span>My courses</span>
        </div>
        <ul slot="dropdown">
            {#each courses as course}
                <li>{course}</li>
            {/each}
        </ul>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 80%;
    }

    .content {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        font-size: 1.25rem;
        color: #555;
    }

    @media (min-width: 60rem) {
        .nav-item-container {
            margin-right: .5rem;
            padding-right: .5rem;
            border-right: 1px solid #555;
        }

        .content {
            display: flex;
            align-items: flex-end;
            width: auto;
            font-size: 1rem;
        }

        .content::after {
            content: "";
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent;
            margin-left: .5rem;
        }
    }
</style>