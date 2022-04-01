import './changeAvatarModalWindow.scss';

import template from './changeAvatarModalWindow.hbs';

export default function changeAvatarTemplate(model: {closeButtonImgSrc: URL, addFileImgSrc: URL}) {
  return template(model);
}
