// ****************************
// Login page 
// by Fernanda Pacheco 
// ****************************

// ***********INDEX************
// 1- SELECTORS
// 2- AUXILIARY FUNCTIONS
// 3- EVENT & VALIDATION
// ****************************


// ***************************
// 1 - SELECTORS
// ***************************
const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const secPassword = document.querySelector("#confirm-password");


// ***************************************************
// 2 - AUXILIARY FUNCTIONS [for style and error msg]
// ***************************************************
const sendError = (element, msg) => {
    const errorMsg = element.nextElementSibling;
    errorMsg.classList.remove("hide")
    errorMsg.classList.add("span-error")
    errorMsg.innerText = msg;
}

const hideError = (element) => {
    const errorMgs = element.nextElementSibling
    errorMgs.classList.add("hide")
}

const style = (element, addStyle, removeStyle) => {
    element.classList.add(addStyle);
    element.classList.remove(removeStyle);
}

// ***************************
// 3 - EVENT & VALIDATION
// ***************************
form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkUsername(username);
    checkEmail(email);
    checkPassword(password);
    matchPassword(password, secPassword);
    if (checkUsername(username) && checkEmail(email) && checkPassword(password) && matchPassword(password, secPassword)) {
        alert("You're now registed!")
    }
})

// cheking username
function checkUsername(username) {
    if (username.value.length < 3) {
        style(username, "error", "correct")
        sendError(username, "Username must be at least 3 characters");
    } else {
        style(username, "correct", "error")
        hideError(username)
        return true
    }
}

// checking email
function checkEmail(email) {
    //Regular Expression Pattern: https://www.w3resource.com/javascript/form/email-validation.php
    if (email.value.length === 0) {
        style(email, "error", "correct");
        sendError(email, "Enter an email");
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
        style(email, "correct", "error");
        hideError(email);
        return true;
    } else {
        style(email, "error", "correct");
        sendError(email, "Enter a valid e-mail")
    }
}

// checking password
function checkPassword(password) {
    if (password.value.length < 6) {
        style(password, "error", "correct")
        sendError(password, "Passwords must be at least 6 characters")
    } else {
        style(password, "correct", "error")
        hideError(password)
        return true
    }
}

// cheking second password
function matchPassword(password, secPassword) {
    if (secPassword.value.length === 0) {
        style(secPassword, "error", "correct")
        sendError(secPassword, "Confirm your password")
    } else if (password.value !== secPassword.value) {
        style(secPassword, "error", "correct")
        sendError(secPassword, "Passwords must match")
    } else {
        style(secPassword, "correct", "error")
        hideError(secPassword)
        return true
    }
}