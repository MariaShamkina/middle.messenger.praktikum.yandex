import "./profile.scss";

import {profileData} from "../../data/profileData";

import {activateChangingAvatarModal} from "./modules/changeAvatarModalWindow/changeAvatarModalWindow.js";
import {showProfileData, changeProfileData, showChangePasswordSection} from "./profile.js";


const avatar = document.getElementById("avatarImg");
!avatar || (avatar.src = profileData.imgSrc);

const userName = document.querySelector(".userName");
!userName || (userName.textContent = profileData.display_name);

generateProfileFields();
showProfileData();  

const changeProfileControl = document.querySelector(".change-profile-button");
!changeProfileControl || (changeProfileControl.onclick = changeProfileData);

const changePasswordControl = document.querySelector(".change-password-button");
!changePasswordControl || (changePasswordControl.onclick = showChangePasswordSection);

generateAvatarChangingModalWindow();
activateChangingAvatarModal();

import inputFieldTemplate from "../partials/inputField.hbs";
function generateProfileFields(){
  const contactProfileContainer = document.querySelector(".contact-profile-container");
  if (!contactProfileContainer) return;

  let fieldGenData = [
    {name: "first_name",    type: "text",  placeholder: "Имя"},
    {name: "second_name",   type: "text",  placeholder: "Фамилия"},
    {name: "display_name",  type: "text",  placeholder: "Имя в чате"},
    {name: "login",         type: "text",  placeholder: "Логин"},
    {name: "email",         type: "email", placeholder: "Почта"},
    {name: "phone",         type: "tel",   placeholder: "Телефон"},
  ];
  fieldGenData.map(field => field.value = profileData[field.name]);

  const fieldsHtml = fieldGenData.reduce((res, field) => res += inputFieldTemplate({
    fieldName: field.name, 
    fieldType: field.type, 
    fieldPlaceholder: field.placeholder, 
    value: field.value}), "");
  contactProfileContainer.innerHTML = fieldsHtml + contactProfileContainer.innerHTML;
}

import changeAvatarTemplate from "./modules/changeAvatarModalWindow";
function generateAvatarChangingModalWindow(){
  const changeAvatarPlace = document.getElementById("changeAvatarPlace");
  if(!changeAvatarPlace) return;
  changeAvatarPlace.innerHTML = changeAvatarTemplate({
    closeButtonImgSrc: new URL("../../img/close_button.svg", import.meta.url), 
    addFileImgSrc: new URL("../../img/add_file.svg", import.meta.url),
  });
}