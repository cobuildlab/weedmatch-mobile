import validation from 'validate.js';

export default function validate(fieldName, value) {
    let constraints = {
        email: {
            presence: true,
            format: {
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email',
            },
        },
        password: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20,
                message: 'Invalid Password',
            },
        },
        confirmPassword: {
            presence: true,
            equality: 'password',
        },
        full_name: {
            presence: true,
            length: {
                minimum: 3,
                maximum: 20,
                message: 'Invalid Full Name',
            },
        },
    };

    let formValues = {};
    formValues[fieldName] = value;

    let formFields = {};
    formFields[fieldName] = constraints[fieldName];


    const result = validation(formValues, formFields);

    if (result) {
        return result[fieldName][0];
    }
    return null;
}
