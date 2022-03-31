import "./chat.scss";

import contactsTemplate from "./modules/contacts";
import contentTemplate from "./modules/content";

import {contactsData} from "../../data/contactsData";

import {switchScrollbar} from "./modules/contacts/contacts";
import {activateTab} from "./chat";

import * as Handlebars from 'handlebars'

Handlebars.registerHelper('getShortName', function (aString, num) {
  return (aString.length <= num)?aString:(aString.slice(0, num)+ "…");
})

const contacts = document.querySelector(".wrapper-chat-contacts-list");
if(contacts){

  const contactsHtml = contactsTemplate({contacts: contactsData});
  contacts.innerHTML = contactsHtml;
}

const content = document.querySelector(".content");
if(content){
  const contentHtml = contentTemplate();
  content.innerHTML = contentHtml;
}

switchScrollbar("wrapper-chat-contacts-list");
activateTab();
