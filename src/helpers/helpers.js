const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const convertErrorsToString = (errorMessages) => {
    return Object.values(errorMessages).join(" \n ");
};

export const validateSignUpForm = (userData, setErrors, validateOnAPISide) => {
    const errorMessages = {};
    const { username, email, password, repeatedPassword } = userData;

    if (!username.trim()) {
        errorMessages.username = "Nieprawdiłowa nazwa uytkownika";
    };

    if (!email.trim() || !emailRegex.test(email.trim())) {
        errorMessages.email = "Nieprawidłowy adres e-mail";
    };

    if (!password.trim()) {
        if (!validateOnAPISide) {
        errorMessages.password = "Wpisz hasło";
        } else {
            errorMessages.password = "Z Twoim hasłem jest coś nie tak, spróbuj ponownie"
        };
    };

    if (!repeatedPassword.trim() && !validateOnAPISide) {
        errorMessages.repeatedPassword = "Powtórz hasło";
    };

    if (password !== repeatedPassword) {
        errorMessages.password = "Podane hasła się nie zgadzają";
        errorMessages.repeatedPassword = "Podane hasła się nie zgadzają";
    };

    if (password.trim().length < 6) {
        errorMessages.password = "Hasło powinno składać się z minimum 6 znaków";
    };

    console.log('errorMessages', errorMessages);

    if ((errorMessages.username || errorMessages.email || errorMessages.password || errorMessages.repeatedPassword) && !validateOnAPISide) {
        setErrors(errorMessages);
        return false;
    } else if ((errorMessages.username || errorMessages.email || errorMessages.password) && validateOnAPISide) {
        delete errorMessages.repeatedPassword;
        const allErrorsString = convertErrorsToString(errorMessages);
        return [false, allErrorsString];
    }

    //Data are valid - return array for destructurization if it's on API side
    if (validateOnAPISide) {
        return [true, {}];
    };

    return true;
};

export const validateSignInForm = (userData, setErrors, validateOnAPISide) => {
    const errorMessages = {};
    const { email, password } = userData;

    if (!email.trim() || !emailRegex.test(email.trim())) {
        errorMessages.email = "Nieprawidłowy adres e-mail";
    };

    if (!password.trim()) {
        if (!validateOnAPISide) {
        errorMessages.password = "Wpisz hasło";
        } else {
            errorMessages.password = "Z Twoim hasłem jest coś nie tak, spróbuj ponownie"
        };
    };

    console.log('errorMessages', errorMessages);

    if ((errorMessages.email || errorMessages.password) && !validateOnAPISide) {
        setErrors(errorMessages);
        return false;
    } else if ((errorMessages.email || errorMessages.password) && validateOnAPISide) {
        const allErrorsString = convertErrorsToString(errorMessages);
        return [false, allErrorsString];
    };

    //Data are valid - return array for destructurization if it's on API side
    if (validateOnAPISide) {
        return [true, {}];
    };

    return true;
};