import Component, { IProperties } from '../../../../../utils/component';
import contentInfoTemplate from './contentInfo.hbs';
import Button from '../../../../partials/button';
import { hideMenuOnClickOutsideThePanel } from './index';

interface IContentInfo extends IProperties{
  contactInfo?: ContactData,
}

export class ContentInfo extends Component<IContentInfo> {
  protected initChildren() {
    this.children.contactMenuButton = new Button({
      buttonText: 'Меню собеседника',
      buttonType: 'button',
      className: 'contactMenu-button',
      contactMenuImgSrc: new URL('../../../../../img/contactMenu.svg', import.meta.url),
      events: {
        click: (e: Event) => {
          const contactMenuPanel = (e.currentTarget as HTMLElement).parentNode?.querySelector('.contactMenu-panel');
          contactMenuPanel?.toggleAttribute('hidden');
        },
      },
    });

    hideMenuOnClickOutsideThePanel();
  }

  render() {
    return this.compile(contentInfoTemplate, this.props);
  }
}
