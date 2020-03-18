<script>
    // TODO add validation + icons
    import {logIn} from '../../util/auth.js';

    import Form from './Form.svelte';
    import Modal from '../UI/Modal.svelte';

    export let close;

    let inputs = {
        email: {
            value: '',
            type: 'email',
            placeholder: 'Email',
            isValid: false,
            isTouched: false,
            errorMessage: null,
            validate: value => {
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
                return [true, null];
            }
        }
    };

</script>

<Modal close={close}>
    <div class="modal-content">
        <h2>Log in to your gAcad account</h2>
        <Form {inputs} buttonContent="Log in" submit={logIn} />
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