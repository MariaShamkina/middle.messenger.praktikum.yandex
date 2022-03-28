const password = document.querySelector("[name='password']");
const confirm_password = document.querySelector("[name='confirmPassword']");
const confPasswordFieldWrapper = document.querySelector(".wrapper-confirmPassword-field");
const errorFieldWrapper = document.querySelector(".wrapper-error-field");
const errorText = document.querySelector(".error-text-absolute");
function validatePassword(){
  if (!password || !confirm_password) return;
  
  if(password.value != confirm_password.value) {
    confPasswordFieldWrapper?.classList.add("error-field");
    !errorFieldWrapper || (errorFieldWrapper.hidden = false);
    !errorText || (errorText.textContent = "Пароли не совпадают");
  }
  else{
    confPasswordFieldWrapper?.classList.remove("error-field");
    !errorFieldWrapper || (errorFieldWrapper.hidden = true);
    !errorText || (errorText.textContent = "");
  }
}

export function submitClickDummy(){
  const submit = document.querySelector(".submit-button");
  if (!submit) return;
  submit.onclick = function(e){
    location.href = "../chat/chat.html";
    e.preventDefault();
  }
}

export function passwordEqualityValidation(){
  const password = document.querySelector("[name='password']");
  const confirm_password = document.querySelector("[name='confirmPassword']");
  if (!password || !confirm_password) return;

  password.onkeyup = validatePassword;
  confirm_password.onkeyup = validatePassword;

  let errorFieldImg = document.querySelector(".error-field-img");
  if (!errorFieldImg) return;
  errorFieldImg.onclick = function(){
    const errorText = document.querySelector(".error-text-absolute");
    if (errorText){
      errorText.hidden = !errorText.hidden;
    }
  }
}