const password: HTMLInputElement | null = document.querySelector("[name='password']");
const confirmPassword: HTMLInputElement | null = document.querySelector("[name='confirmPassword']");
const confPasswordFieldWrapper = document.querySelector('.wrapper-confirmPassword-field');
const errorFieldWrapper = document.querySelector('.wrapper-error-field');
const errorText = document.querySelector('.error-text-absolute');

function validatePassword() {
  if (!password || !confirmPassword) return;

  if (password.value !== confirmPassword.value) {
    confPasswordFieldWrapper?.classList.add('error-field');
    (errorFieldWrapper?.removeAttribute('hidden'));
    if (errorText) errorText.textContent = 'Пароли не совпадают';
  } else {
    confPasswordFieldWrapper?.classList.remove('error-field');
    (errorFieldWrapper?.setAttribute('hidden', ''));
    if (errorText) errorText.textContent = '';
  }
}

export function submitClickDummy() {
  const submit = document.querySelector('.submit-button');
  submit?.addEventListener('click', (e) => {
    window.location.href = '../chat/chat.html';
    e.preventDefault();
  });
}

export function passwordEqualityValidation() {
  if (!password || !confirmPassword) return;

  password.addEventListener('keyup', validatePassword);
  confirmPassword.addEventListener('keyup', validatePassword);

  const errorFieldImg = document.querySelector('.error-field-img');
  if (!errorFieldImg) return;
  errorFieldImg.addEventListener('click', () => {
    if (errorText) {
      errorText.toggleAttribute('hidden');
    }
  });
}
