import './content.scss';
import template from './content.hbs';
import emptyTemplate from './emptyContent.hbs';

type contentData = {
  contactInfo: contactData,
  content: message[],
  fileIconSrc: string,
  sendMessIconSrc: string,
  contactMenuSrc: string
}

export default function contentTemplate(model?: contentData) {
  if (!model || !model.contactInfo) { return emptyTemplate(); }
  return template(model);
}
