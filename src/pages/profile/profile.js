export function showProfileData(){
  const fieldsLabels = document.querySelectorAll(".contact-profile-container label");
  fieldsLabels.forEach(label => label.hidden = false);
  const profileInputs = document.querySelectorAll(".data-change-section input");
  profileInputs.forEach(input => input.readOnly = true);
}

export function changeProfileData(){
  const fieldsLabels = document.querySelectorAll(".contact-profile-container label");
  fieldsLabels.forEach(label => label.hidden = true);
  const profileInputs = document.querySelectorAll(".data-change-section input");
  profileInputs.forEach(input => input.readOnly = false);
  const controlContainer = document.querySelector(".control-container");
  !controlContainer || (controlContainer.style.display = "none");
  const submitButton = document.querySelector(".contact-profile-container .submit-button")
  !submitButton || (submitButton.hidden = false);
}

export function showChangePasswordSection(){
  const dataChangeSection = document.querySelector(".data-change-section");
  !dataChangeSection || (dataChangeSection.hidden = true);
  const passwordChangeSection = document.querySelector(".password-change-section");
  !passwordChangeSection || (passwordChangeSection.hidden = false);
}