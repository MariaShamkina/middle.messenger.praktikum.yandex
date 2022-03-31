const password: HTMLInputElement | null = document.querySelector("[name='password']");
const confirm_password: HTMLInputElement | null = document.querySelector("[name='confirmPassword']");
const confPasswordFieldWrapper = document.querySelector(".wrapper-confirmPassword-field");
const errorFieldWrapper = document.querySelector(".wrapper-error-field");
const errorText = document.querySelector(".error-text-absolute");

function validatePassword(){
  if (!password || !confirm_password) return;
  
  if(password.value != confirm_password.value) {
    confPasswordFieldWrapper?.classList.add("error-field");
    (errorFieldWrapper?.removeAttribute('hidden'));
    !errorText || (errorText.textContent = "Пароли не совпадают");
  }
  else{
    confPasswordFieldWrapper?.classList.remove("error-field");
    (errorFieldWrapper?.setAttribute('hidden', ''));
    !errorText || (errorText.textContent = "");
  }
}

export function submitClickDummy(){
  const submit = document.querySelector(".submit-button");
  submit?.addEventListener('click', function(e){
    location.href = "../chat/chat.html";
    e.preventDefault();
  });
}

export function passwordEqualityValidation(){
  const password = document.querySelector("[name='password']");
  const confirm_password = document.querySelector("[name='confirmPassword']");
  if (!password || !confirm_password) return;

  password.addEventListener('keyup', validatePassword);
  confirm_password.addEventListener('keyup', validatePassword);

  let errorFieldImg = document.querySelector(".error-field-img");
  if (!errorFieldImg) return;
  errorFieldImg.addEventListener('click', function(){
    const errorText = document.querySelector(".error-text-absolute");
    if (errorText){
      errorText.toggleAttribute('hidden');
    }
  });
}