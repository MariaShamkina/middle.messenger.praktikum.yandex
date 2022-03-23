export function displayErrors(){
    let submit = document.querySelector('.submit-button');
    submit.onclick = function(e){
        let login = document.querySelector('[name="login"]').value;
        if(login == 'Тест') {
            location.href = '../chat/chat.html';
            e.preventDefault();
        } else {
            let loginFieldWrapper = document.querySelector('.wrapper-login-field');
            let errorFieldWrapper = document.querySelector('.wrapper-error-field');
            let errorText = document.querySelector('.error-text-absolute');
            loginFieldWrapper.classList.add("error-field");
            errorFieldWrapper.hidden = false;
            errorText.textContent = 'Неверный логин. (Логин "Тест" существует)';
            e.preventDefault();
        }
    }
    let errorFieldImg = document.querySelector('.error-field-img');
    errorFieldImg.onclick = function(){
        let errorText = document.querySelector('.error-text-absolute');
        errorText.hidden = !errorText.hidden;
    }
}