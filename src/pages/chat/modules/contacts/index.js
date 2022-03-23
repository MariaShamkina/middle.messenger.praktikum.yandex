import "./contacts.css";
import template from "./contacts.hbs";

export default function contactsTemplate(model) {
    return template({contacts: model.contacts});
};
