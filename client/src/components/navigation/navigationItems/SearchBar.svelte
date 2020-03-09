<script>
    let value = '';
    const changeHandler = event => console.log(event);
    const submitHandler = event => console.log(event);

    let searchIconSrc = 'images/search-red.svg';
    let button;
    const buttonOnHover = () => {
        searchIconSrc = 'images/search-white.svg';
        button.style.background = '#ef3535';
    };
    const buttonOnHoverOut = () => {
        searchIconSrc = 'images/search-red.svg';
        button.style.background = 'transparent';
    };
</script>

<div class="search-bar">
    <input
        type="text"
        placeholder="Find your passion"
        bind:value on:change={changeHandler}
    />
    <button
        on:click={submitHandler}
        on:mouseover={buttonOnHover}
        on:mouseout={buttonOnHoverOut}
        bind:this={button}    
    >
        <img src={searchIconSrc} alt="search icon">
    </button>
</div>

<style>
    .search-bar {
        display: inline-flex;
        align-items: center;
        height: 100%;
        width: 30rem;
        margin: auto 0;
        background: #eee;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .search-bar:focus-within {
        background: white;
        border-color: #eee;
    }

    input {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: .25rem;
        border: none;
        background: transparent;
    }

    input:focus {
        outline: none;
    }

    button {
        height: 100%;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: none;
    }

    button img {
        height: 50%;
        margin: 0 .75rem;
    }

    button:focus {
        outline: none;
    }
</style>