import './contacts.scss';
// import template from "./contacts.hbs";

import * as Handlebars from 'handlebars';

export default function contactsTemplate(model: {contacts: contactData[]}) {
  const template2 = Handlebars.compile(
    `<ul class="chat-contacts-list">
    {{#each contacts}}
    <li class="tab">
      <img class="avatar" src="{{this.imgSrc}}" alt="Аватар собеседника">
      <p hidden id="id">{{this.id}}</p>
      <a class="tab-link" href="#">{{getShortName this.name 12}}</a>
    </li>
    {{/each}}
  </ul>`,
  );
  return template2(model);
}
