<script>
    import Dropdown from '../../UI/Dropdown.svelte';

    let isDropdownShown = false;
    let shouldDropdownShow = false;
    let button;

    const showDropdown = () => {
        isDropdownShown = true;
        shouldDropdownShow = true;
        button.style.background = '#eee';
    };
    const hideDropdown = () => {
        shouldDropdownShow = false;
        setTimeout(() => {
            if (!shouldDropdownShow) {
                isDropdownShown = false;
                button.style.background = 'transparent';
            }
        }, 50);
    };
</script>

<div class="nav-item">
    <button
        bind:this={button}
        on:mouseenter={showDropdown}
        on:mouseleave={hideDropdown}
    >
        <slot></slot>
    </button>
    <Dropdown
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