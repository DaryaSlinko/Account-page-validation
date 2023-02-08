window.onload = function () {
    let fullName = document.getElementsByClassName("name")[0];
    let username = document.getElementsByClassName("username")[0];
    let email = document.getElementsByClassName("email")[0];
    let password = document.getElementsByClassName("password")[0];
    let password2 = document.getElementsByClassName("password-repeat")[0];
    let agreeCheck = document.getElementById("agree-check")
    let form = document.getElementById("person-info-form")
    let popup = document.querySelector(".popup")
    let input = document.querySelectorAll(".input")
    let title = document.querySelector(".title")

    fullName.onkeydown = (e) => {
        if (!isNaN(parseInt(e.key)) && e.key.toLowerCase() !== "backspace") {
            return false;
        }
    }
    username.onkeydown = (e) => {
        if (e.key === "." || e.key === ",") {
            return false;
        }
    }
    agreeCheck.onchange = () => {
        if (agreeCheck.checked) {
            console.log('Согласен')
            $('.agree-check-title').css('color', '#636363')
        } else
            console.log('Не согласен')
    }

    $('.input').keyup(function () {
            if (!($(this).val()) && $(this).hasClass('form-control')) {
                $(this).parent().next().next().css('visibility', 'hidden');
                $(this).parent().next().next().next().css('visibility', 'hidden');
                $(this).parent().next().next().next().css('visibility', 'hidden');
                $(this).parent().next().css('visibility', 'visible');
            }
            if (($(this).val()) && $(this).hasClass('form-control')) {
                $(this).parent().next().css('visibility', 'hidden');
            }

        }
    )


    form.addEventListener("submit", submitRegistrationForm)


    function isValid() {
        nameDataControl(nameControl())
        usernameDataControl(usernameControl())
        emailDataControl(emailControl())
        password1DataControl(password1Control())
        agreementControl()
        result = nameDataControl(nameControl()) && usernameDataControl(usernameControl()) && emailDataControl(emailControl()) && password1DataControl(password1Control()) && agreementControl()

    }

    function hideHelpText() {
        $('.input').parent().next().next().css('visibility', 'hidden');
        $('.input').parent().next().next().next().css('visibility', 'hidden');
        $('.input').parent().next().css('visibility', 'hidden');
        $('.invalid-user').css('visibility', 'hidden');
        $('.input').removeClass('form-control')
        $('.agree-check-title').css('color', '#636363')
    }

    function showHelpText() {
        $('.form-control').each(function () {
            if (!($(this).val())) {
                $(this).parent().next().css('visibility', 'visible')
                $('.form-control:invalid[type=checkbox]').parent().css('color', '#ee2020')
            }
        })
    }

    function submitRegistrationForm(event) {
        event.preventDefault()
        isValid()
        const isFull = result
        if (isFull) {
            hideHelpText()
            openModal()
            saveAnAccountMember()
        } else {
            if (!$('.input').hasClass('wrong-user'))
                $('.input').addClass('form-control')
        }
        showHelpText()
    }

    function isPasswordSame() {
        if ($(password).val() && $(password2).val() && (password.value !== password2.value)) {
            $(password).parent().next().css('visibility', 'hidden')
            $(password2).parent().next().css('visibility', 'hidden');
            $(password).parent().next().next().next().css('visibility', 'hidden');
            $(password).addClass('wrong-user')
            $(password2).addClass('wrong-user')
            return false;
        }
        return true;
    }


    ////
    function nameControl() {
        if (!fullName.value) {
            $(fullName).parent().next().css('visibility', 'visible')
            $(fullName).addClass('form-control')
            return false;
        } else {
            return true;
        }

    }

    function nameDataControl(nameValue) {
        if (nameValue) {
            if (!($(fullName).val().match(/^[a-zA-ZА-Яа-яЁё\s]+$/))) {
                $(fullName).parent().next().next().css('visibility', 'visible')
                return false;
            } else {
                return true;
            }
        }

    }

    $(fullName).keyup(function () {
        if ($(fullName).hasClass('form-control') && $(fullName).val() && ($(fullName).val().match(/^[a-zA-ZА-Яа-яЁё\s]+$/))) {
            $(fullName).parent().next().next().css('visibility', 'hidden')
        }
        if ($(fullName).hasClass('form-control') && $(fullName).val() && !($(fullName).val().match(/^[a-zA-ZА-Яа-яЁё\s]+$/))) {
            $(fullName).parent().next().next().css('visibility', 'visible')
        }
    })

////
    function usernameControl() {
        if (!username.value) {
            $(username).parent().next().css('visibility', 'visible')
            $(username).addClass('form-control')
            return false;
        } else {
            return true;
        }

    }

    function usernameDataControl(usernameValue) {
        if (usernameValue) {
            if (!($(username).val().match(/^[a-zA-ZА-Яа-яЁё0-9-_]+$/))) {
                $(username).parent().next().next().css('visibility', 'visible')
                return false;
            } else {
                return true;
            }
        }
    }

    $(username).keyup(function () {
        if ($(username).hasClass('form-control') && $(username).val() && ($(username).val().match(/^[a-zA-ZА-Яа-яЁё0-9-_]+$/))) {
            $(username).parent().next().next().css('visibility', 'hidden')
        }
        if ($(username).hasClass('form-control') && $(username).val() && !($(username).val().match(/^[a-zA-ZА-Яа-яЁё0-9-_]+$/))) {
            $(username).parent().next().next().css('visibility', 'visible')
            $(username).parent().next().next().next().css('visibility', 'hidden')
        }
        if ($(username).hasClass('wrong-user') && $(username).val()) {
            $(username).removeClass('wrong-user').addClass('form-control')
        }
    })

////
    function emailControl() {
        if (!email.value) {
            $(email).parent().next().css('visibility', 'visible')
            $(email).addClass('form-control')
            return false;
        } else {
            return true;
        }

    }

    function emailDataControl(emailValue) {
        if (emailValue) {
            if (!($(email).val().match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/))) {
                $(email).parent().next().next().css('visibility', 'visible')
                return false;
            } else {
                return true;
            }
        }
    }

    $(email).keyup(function () {
        if ($(email).hasClass('form-control') && $(email).val() && ($(email).val().match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/))) {
            $(email).parent().next().next().css('visibility', 'hidden')
        }
        if ($(email).hasClass('form-control') && $(email).val() && !($(email).val().match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/))) {
            $(email).parent().next().next().css('visibility', 'visible')
        }
    })

///
    function password1Control() {
        if (!password.value) {
            $(password).parent().next().css('visibility', 'visible')
            $(password).addClass('form-control')
            return false;
        } else {
            return true;
        }

    }

    function password1DataControl(passwordValue) {
        if (passwordValue) {
            if (!($(password).val().match(/((?=.*\d)^(?=.*[-!@#$%^&+*])(?=.*[a-z])(?=.*[A-Z]).{8,})/))) {
                $(password).parent().next().next().next().css('visibility', 'visible')
                $(password).parent().next().css('visibility', 'hidden')
                $(password).parent().next().next().css('visibility', 'hidden')
                return false;
            }
            if (($(password).val().match(/((?=.*\d)^(?=.*[-!@#$%^&+*])(?=.*[a-z])(?=.*[A-Z]).{8,})/))) {
                const passwordsAreSame = isPasswordSame()
                if (!passwordsAreSame) {
                    $(password2).parent().next().next().css('visibility', 'visible')
                    $(password).parent().next().next().css('visibility', 'visible')
                    $(password2).parent().next().css('visibility', 'hidden')
                    $(password).addClass('wrong-user').removeClass('form-control')
                    $(password2).removeClass('form-control').addClass('wrong-user')
                    return false;
                } else {
                    $(password).addClass('form-control').removeClass('wrong-user')
                    $(password2).removeClass('wrong-user').addClass('form-control')
                    $(password2).parent().next().next().css('visibility', 'hidden')
                    $(password).parent().next().next().css('visibility', 'hidden')
                    return true;
                }

            }
        } else {
            return false;
        }
    }

    $(password).keyup(function () {
        if ($(password).hasClass('form-control') && $(password).val() && !($(password).val().match(/((?=.*\d)^(?=.*[-!@#$%^&+*])(?=.*[a-z])(?=.*[A-Z]).{8,})/))) {
            $(password).parent().next().next().next().css('visibility', 'visible')
            $(password).parent().next().next().css('visibility', 'hidden')
            $(password).parent().next().css('visibility', 'hidden')
        }
        if ($(password).hasClass('form-control') && $(password).val() && ($(password).val().match(/((?=.*\d)^(?=.*[-!@#$%^&+*])(?=.*[a-z])(?=.*[A-Z]).{8,})/))) {
            $(password).parent().next().next().next().css('visibility', 'hidden')
        }
        if ($(password).hasClass('wrong-user') && $(password).val()) {
            $(password).removeClass('wrong-user').addClass('form-control')
        }
    })


///

    function agreementControl() {
        if (!agreeCheck.checked) {
            $('.agree-check-title').css('color', '#ee2020')
            return false;
        } else {
            return true;
        }

    }


    function openModal() {
        popup.classList.add("open")
        let emailInfo = document.getElementsByClassName("popup-span")[0]
        emailInfo.innerHTML = email.value
    }

    function saveAnAccountMember() {
        let memberInfo = {
            fullName: $(fullName).val(),
            username: $(username).val(),
            password: $(password).val()
        }
        let clients = [];
        let member = localStorage.getItem('member');
        if (member) {
            clients = JSON.parse(member)
        }
        clients.push(memberInfo);
        localStorage.setItem('member', JSON.stringify(clients))
    }

    function closeModal() {
        popup.classList.remove("open")
    }

    function resetForm() {
        form.reset()
        $(input).removeClass('form-control')
    }

    document.querySelector(".popup-btn").addEventListener("click", () => {
        resetForm()
        closeModal()
        redirectToLogin()


    })

    function redirectToLogin() {
        hideHelpText()
        resetForm()
        const controlsForRemove = document.querySelectorAll(".forRemove")
        controlsForRemove.forEach((cntrl) => cntrl.remove())
        title.innerText = "Log in to the system"
        $('#signUp').text('Log in')
        $('.registration-link').show().click(function () {
            location.reload();
            return false;
        })
        form.removeEventListener("submit", submitRegistrationForm)
        form.addEventListener("submit", logIn)
    }

    function isLogInValid() {
        usernameDataControl(usernameControl())
        password1DataControl(password1Control())
        agreementControl()
        result = usernameDataControl(usernameControl()) && password1DataControl(password1Control()) && agreementControl()

    }


    function logIn(event) {
        event.preventDefault()
        isLogInValid()
        const isFull = result
        if (isFull) {
            isItMember()
        } else {
            $('.input').addClass('form-control')
            showHelpText()
        }
    }


    function isItMember() {
        let clients = [];
        let member = localStorage.getItem('member');
        if (member) {
            clients = JSON.parse(member)
            console.log(clients)
            let user = clients.find(u => (u.username === $(username).val()));
            if (user) {
                user = clients.find(u => (u.username === $(username).val() && u.password === $(password).val()));
                if (user) {
                    $(username).parent().next().next().next().css('visibility', 'hidden');
                    $(password).parent().next().next().next().next().css('visibility', 'hidden')
                    redirectToAccount()
                } else {
                    $(username).parent().next().next().next().css('visibility', 'hidden');
                    $(password).parent().next().next().next().next().css('visibility', 'visible')
                    $(password).removeClass('form-control').addClass('wrong-user')
                }

            } else {
                $(username).parent().next().next().next().css('visibility', 'visible');
                $(password).parent().next().next().next().next().css('visibility', 'hidden')
                $(password).removeClass('form-control').addClass('wrong-user')
                $(username).removeClass('form-control').addClass('wrong-user')

            }
        }
    }


    document.querySelector(".have-account-link").addEventListener("click", redirectToLogin)

    function redirectToAccount() {

        const controlsForRemoveForAccount = document.querySelectorAll(".forRemoveForAccount")
        controlsForRemoveForAccount.forEach((cntrl) => cntrl.remove())


        let member = localStorage.getItem('member');
        if (member) {
            clients = JSON.parse(member)
            let user = clients.find(u => (u.username === $(username).val()));
            if (user.hasOwnProperty('fullName')) {
                $('.title').text(`Welcome, ${user.fullName} !`)
            } else {
                $('.title').text(`Welcome !`)
            }
        }


        $('#signUp').text('Exit').css('margin-top', '500px')

        form.removeEventListener("submit", logIn)

        $('#signUp').click(function () {
            location.reload();
            return false;
        })
    }


}


