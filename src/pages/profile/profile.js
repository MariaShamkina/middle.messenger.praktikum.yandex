export function showProfileData(){
    let fieldsLabels = document.querySelectorAll(".contact-profile-container label");
    fieldsLabels.forEach(label => label.hidden = false);
    let profileInputs = document.querySelectorAll(".data-change-section input");
    profileInputs.forEach(input => input.readOnly = true);
}

export function changeProfileData(){
    let fieldsLabels = document.querySelectorAll(".contact-profile-container label");
    fieldsLabels.forEach(label => label.hidden = true);
    let profileInputs = document.querySelectorAll(".data-change-section input");
    profileInputs.forEach(input => input.readOnly = false);
    document.querySelector(".control-container").style.display = "none";
    document.querySelector(".contact-profile-container .submit-button").hidden = false;
}

export function showChangePasswordSection(){
    document.querySelector(".data-change-section").hidden = true;
    document.querySelector(".password-change-section").hidden = false;
}