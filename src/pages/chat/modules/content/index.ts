import "./content.scss"
import template from "./content.hbs";
import emptyTemplate from "./emptyContent.hbs";

export default function contentTemplate(model?: {contactInfo: contactData, content: message[], fileIconSrc: string, sendMessIconSrc: string, contactMenuSrc: string}) {
  if (!model || !model.contactInfo)
    return emptyTemplate();
  return template(model);
};