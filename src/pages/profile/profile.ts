export function showProfileData() {
  const fieldsLabels = document.querySelectorAll('.contact-profile-container label');
  fieldsLabels.forEach((label) => label.removeAttribute('hidden'));
  const profileInputs = document.querySelectorAll('.data-change-section input');
  profileInputs.forEach((input) => input.setAttribute('readOnly', ''));
}

export function changeProfileData() {
  const fieldsLabels = document.querySelectorAll('.contact-profile-container label');
  fieldsLabels.forEach((label) => label.setAttribute('hidden', ''));
  const profileInputs: NodeListOf<HTMLElement> = document.querySelectorAll('.data-change-section input');
  profileInputs.forEach((input) => input.removeAttribute('readOnly'));
  const controlContainer: HTMLElement | null = document.querySelector('.control-container');
  if (controlContainer) controlContainer.style.display = 'none';
  const submitButton: HTMLElement | null = document.querySelector('.contact-profile-container .submit-button');
  submitButton?.removeAttribute('hidden');
}

export function showChangePasswordSection() {
  const dataChangeSection: HTMLElement | null = document.querySelector('.data-change-section');
  dataChangeSection?.setAttribute('hidden', '');
  const passwordChangeSection: HTMLElement | null = document.querySelector('.password-change-section');
  passwordChangeSection?.removeAttribute('hidden');
}
