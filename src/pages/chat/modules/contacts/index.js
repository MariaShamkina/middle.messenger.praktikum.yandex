import "./contacts.css";
import template from "./contacts.hbs";
import {addAvatars} from "./contacts.js"

export default function contactsTemplate(model) {
    return template({contacts: model.contacts});
};
