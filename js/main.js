var usernameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passInput = document.getElementById("pass");
var signUpBtn = document.getElementById("signUp");
var userNameAlart = document.getElementById("userNameAlert");
var userEmailAlart = document.getElementById("userEmailAlert");
var userPassAlert = document.getElementById("userPassAlert");
var msgSuccess = document.getElementById("msgSuccess");
var msgAgain = document.getElementById("msgAgain");
var msgExist = document.getElementById("msgExist");
var signInBtn = document.getElementById("signIn");


var useremailLogin = document.getElementById("useremail");
var password = document.getElementById("password");
var loginBtn = document.getElementById("login");
var msgFillFelids = document.getElementById("msgFillFelids");
var msgError = document.getElementById("msgError");


var username= localStorage.getItem("USERNAME");
var userArray = [];


if (localStorage.getItem("USERS") != null) {
    userArray = JSON.parse(localStorage.getItem("USERS"));
}




function addUsers() {

    if (validation() == true && useraccountExist() == false) {
        var user = {
            userName: usernameInput.value,
            userEmail: emailInput.value,
            userPass: passInput.value
        }
        console.log(user);
        userArray.push(user);
        msgExist.classList.replace("d-block", "d-none");
        localStorage.setItem("USERS", JSON.stringify(userArray));
        msgAgain.classList.replace("d-block", "d-none");
        msgSuccess.classList.replace("d-none", "d-block");
        signInBtn.classList.replace("d-none", "d-block");
    }

    else if (validation() == false) {
        msgSuccess.classList.replace("d-block", "d-none")
        msgAgain.classList.replace("d-none", "d-block");
    }
    else if (useraccountExist() == true) {
        msgExist.classList.replace("d-none", "d-block");
        msgAgain.classList.replace("d-block", "d-none");
        signInBtn.classList.replace("d-none", "d-block");
        usernameInput.classList.remove('is-valid');
        emailInput.classList.remove("is-valid");
        passInput.classList.remove("is-valid");

    }

}


function userNameValidation() {

    var regName = /^[A-Z][a-z]{3,13}$/
    if (regName.test(usernameInput.value) == true && usernameInput.value != "") {
        usernameInput.classList.add('is-valid');
        usernameInput.classList.remove('is-invalid');
        userNameAlart.classList.replace("d-block", "d-none");
        return true;

    }
    else {
        usernameInput.classList.add("is-invalid");
        userNameAlart.classList.replace("d-none", "d-block");
        return false;
    }

}

function userEmailValidation() {
    var regEmail = /[A-Za-z]@[a-z]{4,10}(.com)$/
    if (regEmail.test(emailInput.value) == true && emailInput.value != "") {
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        userEmailAlart.classList.replace("d-block", "d-none");
        return true;

    }
    else {
        emailInput.classList.add("is-invalid");
        userEmailAlart.classList.replace("d-none", "d-block");
        return false;
    }

}

function userPassValidation() {
    var regPass = /^.{8,16}$/
    if (regPass.test(passInput.value) == true && passInput.value != "") {
        passInput.classList.add("is-valid");
        passInput.classList.remove("is-invalid");
        userPassAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        passInput.classList.add("is-invalid");
        userPassAlert.classList.replace("d-none", "d-block");
        return false;
    }

}

function validation() {
    userNameValidation();
    userEmailValidation();
    userPassValidation();
    if (userNameValidation() == true && userEmailValidation() == true && userPassValidation() == true) {
        return true;
    }
    else {
        return false
    }
}

function useraccountExist() {

    for (var i = 0; i < userArray.length; i++) {

        if (userArray[i].userName == usernameInput.value || userArray[i].userEmail == emailInput.value) {

            return true;

        }
    }
    return false;
}





function login() {

    if (useremailLogin.value == "" || password.value == "") {
        msgFillFelids.classList.replace("d-none", "d-block");

    }
    else{
        for (var i = 0; i < userArray.length; i++) {
            if (userArray[i].userEmail == useremailLogin.value && userArray[i].userPass == password.value) {
                localStorage.setItem("USERNAME",userArray[i].userName)
                loginBtn.setAttribute("href", "welcome.html");
            }
            else{
                msgFillFelids.classList.replace("d-block", "d-none");
                msgError.classList.replace("d-none","d-block");
            }
    
        }
    }
    
}



function displayUserName(){

    document.getElementById("welcome").innerHTML=`Welcome ${username}`;
}

var logoutBtn=document.getElementById("logout");



function logout(){
    localStorage.removeItem("USERNAME")

}
if(signUpBtn){
    signUpBtn.addEventListener("click", addUsers);
}
if(logoutBtn){
    logoutBtn.addEventListener("click",logout);
}
if(loginBtn){
    loginBtn.addEventListener("click", login);
}

