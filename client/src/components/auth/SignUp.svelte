<script>
    // TODO add validation + icons
    import Form from './Form.svelte';
    import Modal from '../UI/Modal.svelte';

    export let close;

    let inputs = {
        firstName: {
            value: '',
            type: 'text',
            placeholder: 'First name',
            isValid: false,
            isTouched: false,
            errorMessage: null,
            validate: value => {
                console.log(value);
                return [true, null];
            }
        },
        lastName: {
            value: '',
            type: 'text',
            placeholder: 'Last name',
            isValid: false,
            isTouched: false,
            errorMessage: null,
            validate: value => {
                console.log(value);
                return [true, null];
            }
        },
        email: {
            value: '',
            type: 'email',
            placeholder: 'Email',
            isValid: false,
            isTouched: false,
            errorMessage: null,
            validate: value => {
                console.log(value);
                return [true, null];
            }
        },
        password: {
            value: '',
            type: 'password',
            placeholder: 'Password',
            isValid: false,
            isTouched: false,
            errorMessage: null,
            validate: value => {
                console.log(value);
                return [true, null];
            }
        }
    };
</script>

<Modal close={close}>
    <div class="modal-content">
        <h2>Log in to your gAcad account</h2>
        <Form {inputs} buttonContent="Sign up" />
    </div>
</Modal>

<style>
    .modal-content {
        width: 30rem;
        max-width: 90vw;
    }

    h2 {
        width: 100%;
        text-align: center;
        padding: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #555;
    }
</style>