import './profile.scss';
import { profileData } from '../../data/profileData';

import { activateChangingAvatarModal } from './modules/changeAvatarModalWindow/changeAvatarModalWindow';
import { showProfileData, changeProfileData, showChangePasswordSection } from './profile';

import inputFieldTemplate from '../partials/inputField.hbs';
import changeAvatarTemplate from './modules/changeAvatarModalWindow';

function generateProfileFields() {
  const contactProfileContainer = document.querySelector('.contact-profile-container');
  if (!contactProfileContainer) return;

  type fieldData = Record<string, string>[];

  let fieldGenData: fieldData = [
    { name: 'first_name', type: 'text', placeholder: 'Имя' },
    { name: 'second_name', type: 'text', placeholder: 'Фамилия' },
    { name: 'display_name', type: 'text', placeholder: 'Имя в чате' },
    { name: 'login', type: 'text', placeholder: 'Логин' },
    { name: 'email', type: 'email', placeholder: 'Почта' },
    { name: 'phone', type: 'tel', placeholder: 'Телефон' },
  ];

  function isValidName(value: string): value is keyof typeof profileData {
    return value in profileData;
  }

  fieldGenData = fieldGenData.map(
    (field) => ((isValidName(field.name)) ? ({ value: `${profileData[field.name]}`, ...field }) : field),
  );

  const fieldsHtml = fieldGenData.reduce((res, field) => res + inputFieldTemplate({
    fieldName: field.name,
    fieldType: field.type,
    fieldPlaceholder: field.placeholder,
    value: field.value,
  }), '');
  contactProfileContainer.innerHTML = fieldsHtml + contactProfileContainer.innerHTML;
}

function generateAvatarChangingModalWindow() {
  const changeAvatarPlace = document.getElementById('changeAvatarPlace');
  if (!changeAvatarPlace) return;
  const avatarPlaceParent = changeAvatarPlace.parentNode;
  if (!avatarPlaceParent) return;
  const newNode = document.createElement('template');
  newNode.innerHTML = changeAvatarTemplate({
    closeButtonImgSrc: new URL('../../img/close_button.svg', import.meta.url),
    addFileImgSrc: new URL('../../img/add_file.svg', import.meta.url),
  });
  if (newNode.content.firstChild) {
    avatarPlaceParent.replaceChild(newNode.content.firstChild, changeAvatarPlace);
  }
}

const avatar = document.getElementById('avatarImg') as HTMLImageElement;
if (avatar) avatar.src = profileData.imgSrc;

const userName = document.querySelector('.userName');
if (userName) userName.textContent = profileData.display_name;

generateProfileFields();
showProfileData();

const changeProfileControl = document.querySelector('.change-profile-button');
changeProfileControl?.addEventListener('click', changeProfileData);

const changePasswordControl = document.querySelector('.change-password-button');
changePasswordControl?.addEventListener('click', showChangePasswordSection);

generateAvatarChangingModalWindow();
activateChangingAvatarModal();
