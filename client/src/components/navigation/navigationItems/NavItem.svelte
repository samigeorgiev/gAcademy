<script>
    import Dropdown from '../../UI/Dropdown.svelte';

    let isDropdownShown = false;
    let button;

    const showDropdown = () => {
        isDropdownShown = true;
        button.style.background = '#eee';
    };
    const hideDropdown = () => {
        isDropdownShown = false;
        button.style.background = 'transparent';
    };
</script>

<div class="nav-item">
    <button
        bind:this={button}
        on:mouseover={showDropdown}
        on:mouseout={hideDropdown}
    >
        <slot></slot>
    </button>
    <Dropdown
        on:mouseover={showDropdown}
        on:mouseout={hideDropdown}
        isShown={isDropdownShown}
    >
        <slot name="dropdown"></slot>
    </Dropdown>
</div>

<style>
    .nav-item {
        position: relative;
        height: 80%;
        margin-right: .5rem;
    }

    button {
        height: 100%;
        padding: .5rem;
        margin: auto;
        background: transparent;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button:hover {
        cursor: pointer;
    }

    button:focus {
        outline: none;
    }
</style>