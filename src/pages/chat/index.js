import "./chat.css";

import contactsTemplate from './modules/contacts';
import contentTemplate from './modules/content';

import {contactsData} from '../../data/contactsData';

import {switchScrollbar, activateTab, stretchableTextArea, displayContactMenu} from "./chat.js"

document.addEventListener('DOMContentLoaded', () => {
    let contacts = document.querySelector(".wrapper-chat-contacts-list");
    let contactsHtml = contactsTemplate({contacts: contactsData});
    contacts.innerHTML = contactsHtml;

    let content = document.querySelector(".content");
    let contentHtml = contentTemplate();
    content.innerHTML = contentHtml;

    switchScrollbar('wrapper-chat-contacts-list');
    activateTab();
    stretchableTextArea();
    displayContactMenu();
});