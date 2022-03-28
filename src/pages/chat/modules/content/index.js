import "./content.scss"
import template from "./content.hbs";
import emptyTemplate from "./emptyContent.hbs";

export default function contentTemplate(model) {
  if (!model || !model.contactInfo)
    return emptyTemplate();
  return template(model);
};
