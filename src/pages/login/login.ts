export function displayErrors(){
  const submit: HTMLElement | null = document.querySelector(".submit-button");
  if (!submit) return;
  submit.onclick = function(e){
    const login = (document.querySelector("[name='login']") as HTMLInputElement)?.value;
    if(login == "Тест") {
      location.href = "../chat/chat.html";
    } else {
      const loginFieldWrapper = document.querySelector(".wrapper-login-field");
      loginFieldWrapper?.classList.add("error-field");

      const errorFieldWrapper: HTMLElement | null = document.querySelector(".wrapper-error-field");
      !errorFieldWrapper || (errorFieldWrapper.hidden = false);

      const errorText = document.querySelector(".error-text-absolute");
      !errorText || (errorText.textContent = 'Неверный логин. (Логин "Тест" существует)');
    }
    e.preventDefault();
  }

  const errorFieldImg: HTMLElement | null = document.querySelector(".error-field-img");
  if(!errorFieldImg) return;
  errorFieldImg.onclick = function(){
    const errorText: HTMLElement | null = document.querySelector(".error-text-absolute");
    errorText?.toggleAttribute('hidden');
  }
}