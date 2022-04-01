import './chat.scss';

import * as Handlebars from 'handlebars';
import contactsTemplate from './modules/contacts';
import contentTemplate from './modules/content';

import { contactsData } from '../../data/contactsData';

import { switchScrollbar } from './modules/contacts/contacts';
import { activateTab } from './chat';

Handlebars.registerHelper('getShortName', (aString, num) => ((aString.length <= num) ? aString : (`${aString.slice(0, num)}…`)));

const contacts = document.querySelector('.wrapper-chat-contacts-list');
if (contacts) {
  contacts.innerHTML = contactsTemplate({ contacts: contactsData });
}

const content = document.querySelector('.content');
if (content) {
  content.innerHTML = contentTemplate();
}

switchScrollbar('wrapper-chat-contacts-list');
activateTab();
