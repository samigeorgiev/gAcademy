<script>
    export let isValid;
    export let isTouched;
    export let errorMessage;
    export let type;
    export let placeholder;
    export let background;
    export let value;

    let invalid = !isValid && isTouched;
</script>

<div class="input-container">
    <input
        {value}
        {type}
        {placeholder}
        style={`background-image: url(${background})`}
        on:input
        class:invalid
    >
    {#if invalid}
        <p class="validation-error">
            {errorMessage}
        </p>
    {/if}
</div>

<style>
    .input-container {
        width: 100%;
        margin: .5rem 0;
    }

    input {
        width: 100%;
        padding: .25rem 1.75rem;
        background-repeat: no-repeat;
        background-size: 12% 70%;
        background-position: left;
        box-sizing: border-box;
        border: 1px solid #ccc;
        font: inherit;
        border-radius: 4px;
    }

    input:focus {
        outline: none;
        border-color: #0e1117;
    }

    .invalid {
        border: 1px solid red;
    }

    .validation-error {
        margin: .3rem 0;
        color: red;
    }
</style>