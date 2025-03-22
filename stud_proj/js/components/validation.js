export function createValidator() {
    const validator = new JustValidate('.questions__form');
    const inputEl = document.querySelectorAll('.custom-input__field');

    validator
        .addField(inputEl[0], [
            {
                rule: 'required',
                errorMessage: 'Введите ваше имя',
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Имя должно содержать минимум 3 символа',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Имя не должно превышать 20 символов',
            },
        ])
        .addField(inputEl[1], [
            {
                rule: 'required',
                errorMessage: 'Введите вашу почту',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный адрес электронной почты',
            },
        ])
        .addField('.custom-checkbox__field', [
            {
                rule: 'required',
                errorMessage: 'Согласие обязательно',
            },
        ]);

    return validator;
}

