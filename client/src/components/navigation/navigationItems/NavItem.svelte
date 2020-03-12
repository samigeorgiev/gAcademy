<script>
    import Dropdown from '../../UI/Dropdown.svelte';

    export let dropdownPosition;

    let isDropdownShown = false;
    let shouldDropdownShow = false;

    const showDropdown = () => {
        isDropdownShown = true;
        shouldDropdownShow = true;
    };
    const hideDropdown = () => {
        shouldDropdownShow = false;
        setTimeout(() => {
            if (!shouldDropdownShow) {
                isDropdownShown = false;
            }
        }, 50);
    };
</script>

<div class="nav-item">
    <button
        class:active={isDropdownShown}
        on:mouseenter={showDropdown}
        on:mouseleave={hideDropdown}
    >
        <slot></slot>
    </button>
    <Dropdown
        position={dropdownPosition}
        on:mouseenter={showDropdown}
        on:mouseleave={hideDropdown}
        isShown={isDropdownShown}
    >
        <slot name="dropdown"></slot>
    </Dropdown>
</div>

<style>
    .nav-item {
        position: relative;
        height: 100%;
    }

    button {
        width: 100%;

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

    .active {
        background: #eee;
    }
</style>