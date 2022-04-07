export { LoginPage as default } from './login';

export function displayErrors(event:Event, errorText: string) {
  const loginFieldWrapper = document.querySelector('.wrapper-login-field');
  loginFieldWrapper?.classList.add('error-field');

  const errorFieldWrapper: HTMLElement | null = document.querySelector('.wrapper-error-field');
  errorFieldWrapper?.removeAttribute('hidden');

  const errorTextSpan = document.querySelector('.error-text-absolute');
  if (errorTextSpan) errorTextSpan.textContent = errorText;
}

// const errorFieldImg: HTMLElement | null = document.querySelector('.error-field-img');
// if (!errorFieldImg) return;
// errorFieldImg.addEventListener('click', () => {
//   const errorText: HTMLElement | null = document.querySelector('.error-text-absolute');
//   errorText?.toggleAttribute('hidden');
