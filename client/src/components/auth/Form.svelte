<script>
    // TDOD check everything for validation + add button blocking on invalid form

    import Input from './Input.svelte';
    import ToggleSwitch from '../UI/ToggleSwitch.svelte';

    export let inputs;
    export let submit;
    export let buttonContent = 'login';

    let isFormValid = false;

    let isTeacher = false;

    const inputChangeHandler = (event, inputName) => {
        let isFormValidToNow = true;
        const input = inputs[inputName];
        const [isValid, errorMessage] = inputs[inputName].validate(event.target.value);
        inputs = {
            ...inputs,
            [inputName]: {
                ...input,
                value: event.target.value,
                isValid, errorMessage, isTouched: true
            }
        };
        Object.values(inputs).forEach(input => {
            isFormValid = isFormValid && input.isValid;
        });
    };

    const submitHandler = event => {
        event.preventDefault();
        let values = {isTeacher};
        for (let key in inputs) {
            values[key] = inputs[key].value;
        }
        submit(values);
    };
</script>

<form on:submit={submitHandler} novalidate>
    {#each Object.entries(inputs) as [key, input]}
        <Input
            value={input.value}
            type={input.type}
            placeholder={input.placeholder}
            isValid={input.isValid}
            isTouched={input.isTouched}
            errorMessage={input.errorMessage}
            background={input.background}
            on:input={event => inputChangeHandler(event, key)}
        />
    {/each}
    <ToggleSwitch on:change={event => isTeacher = event.target.checked} />
    <button type="submit">{buttonContent}</button>
</form>

<style>
    form {
        width: 80%;
        margin: 0 auto;
        padding: 0 .5rem 1rem;
    }

    button {
        width: 100%;
        height: 2rem;
        background: red;
        color: white;
        border: none;
        font: inherit;
    }

    button:focus {
        outline: none;
    }
</style>