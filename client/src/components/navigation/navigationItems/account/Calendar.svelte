<script>
    // TODO dropdown style
    import NavItem from '../NavItem.svelte';

    const nextLesson = 'tomorrow';
</script>

<div class="nav-item-container">
    <NavItem dropdownPosition="right">
        <span class="calendar">
            <img src="images/calendar.svg" alt="Calendar icon">
            <p>Calendar</p>
        </span>
        <p slot="dropdown">{nextLesson}</p>
    </NavItem>
</div>

<style>
    .nav-item-container {
        height: 80%;
    }

    .calendar img {
        display: none;
    }

    .calendar p {
        width: 90%;
        margin: 1rem auto;
        text-align: left;
        font-size: 1.25rem;
        color: #555;
    }

    @media (min-width: 60rem) {
        .nav-item-container {
            margin-right: .5rem;
        }

        .calendar img {
            display: block;
            height: 100%;
        }

        .calendar p {
            display: none;
        }
    }

</style>