import "./chat.css";

import contactsTemplate from './modules/contacts';
import contentTemplate from './modules/content';

import {contactsData} from './data/contactsData';
import getContactData from './data/contactsData';
import getConversation from './data/contentData';

import {switchScrollbar, activateTab, stretchableTextArea} from "./chat.js"

document.addEventListener('DOMContentLoaded', () => {
    let contacts = document.querySelector(".wrapper-chat-contacts-list");
    let contactsHtml = contactsTemplate({contacts: contactsData});
    contacts.innerHTML = contactsHtml;

    let content = document.querySelector(".content");
    let conversationData = getConversation();
    let contentHtml = contentTemplate({
        contactInfo: getContactData(), 
        content: conversationData, 
        fileIconSrc: require("../../img/add_file.svg"),
        sendMessIconSrc: require("../../img/send-comment.svg")
    });
    content.innerHTML = contentHtml;

    switchScrollbar('wrapper-chat-contacts-list');
    activateTab();
    stretchableTextArea();
});