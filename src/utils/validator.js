// validation function

const isEmpty = (value) => {
    if (value.trim() === '') return true;
    return false;
}

const isUsername = (username) => {
    const regEx = /^[a-zA-Z0-9_]{3,20}$/;
    if (username.match(regEx)) return true;
    return false;
}

const isNumber = (number) => {
    const regEx = /^[0-9]{1,20}$/;
    if (number.match(regEx)) return true;
    return false;
}

const isEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    if (email.match(regEx)) return true;
    return false;
}

const isStrongPassword = (password) => {
    const regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if (password.match(regEx)) return true;
    return false;
}


module.exports = {
    isEmpty,
    isEmail,
    isStrongPassword,
    isUsername,
    isNumber
}
