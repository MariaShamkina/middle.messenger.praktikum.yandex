export function displayErrors(){
  const submit = document.querySelector(".submit-button");
  if (!submit) return;
  submit.onclick = function(e){
    const login = document.querySelector("[name='login']")?.value;
    if(login == "Тест") {
      location.href = "../chat/chat.html";
    } else {
      const loginFieldWrapper = document.querySelector(".wrapper-login-field");
      loginFieldWrapper?.classList.add("error-field");

      const errorFieldWrapper = document.querySelector(".wrapper-error-field");
      !errorFieldWrapper || (errorFieldWrapper.hidden = false);

      const errorText = document.querySelector(".error-text-absolute");
      !errorText || (errorText.textContent = 'Неверный логин. (Логин "Тест" существует)');
    }
    e.preventDefault();
  }
  const errorFieldImg = document.querySelector(".error-field-img");
  if(!errorFieldImg) return;
  errorFieldImg.onclick = function(){
    const errorText = document.querySelector(".error-text-absolute");
    errorText.hidden = !errorText.hidden;
  }
}