import "./profile.scss";

import {profileData} from "../../data/profileData"

import {activateChangingAvatarModal} from "./modules/changeAvatarModalWindow/changeAvatarModalWindow.js";
import {showProfileData, changeProfileData, showChangePasswordSection} from "./profile.js"

document.addEventListener('DOMContentLoaded', () => {
    let avatar = document.getElementById("avatarImg");
    avatar.src = profileData.imgSrc;
    
    let userName = document.querySelector(".userName");
    userName.textContent = profileData.display_name;
    
    generateProfileFields();
    showProfileData();

    let changeProfileControl = document.querySelector('.change-profile-control');
    changeProfileControl.onclick = changeProfileData;
    let changePasswordControl = document.querySelector('.change-password-control');
    changePasswordControl.onclick = showChangePasswordSection;
    
    generateAvatarChangingModalWindow();
    activateChangingAvatarModal();
});

import inputFieldTemplate from "../partials/inputField.hbs"
function generateProfileFields(){
    let fieldGenData = [
        {name: "first_name",  type: "text",  placeholder: "Имя"},
        {name: "second_name", type: "text",  placeholder: "Фамилия"},
        {name: "display_name",   type: "text",  placeholder: "Имя в чате"},
        {name: "login",      type: "text",  placeholder: "Логин"},
        {name: "email",      type: "email", placeholder: "Почта"},
        {name: "phone",      type: "tel",   placeholder: "Телефон"},
    ];
    fieldGenData.map(field => field.value = profileData[field.name]);
    let fieldsHtml = fieldGenData.reduce((res, field) => res += inputFieldTemplate({
        fieldName: field.name, 
        fieldType: field.type, 
        fieldPlaceholder: field.placeholder, 
        value: field.value}), "");
    let contactProfileContainer = document.querySelector(".contact-profile-container");
    contactProfileContainer.innerHTML = fieldsHtml + contactProfileContainer.innerHTML;
}

import changeAvatarTemplate from './modules/changeAvatarModalWindow';
function generateAvatarChangingModalWindow(){
    let changeAvatarPlace = document.getElementById("changeAvatarPlace");
    changeAvatarPlace.innerHTML = changeAvatarTemplate({
        closeButtonImgSrc: require("../../img/close_button.svg"), 
        addFileImgSrc: require("../../img/add_file.svg")});
}