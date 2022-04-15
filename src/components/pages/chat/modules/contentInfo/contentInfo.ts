import Component, { IProperties } from '../../../../../utils/component';
import contentInfoTemplate from './contentInfo.hbs';
import Button from '../../../../partials/button';
import { hideMenuOnClickOutsideThePanel } from './index';

interface IContentInfo extends IProperties{
  contactInfo?: contactData,
}

export default class ContentInfo extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IContentInfo) {
    super(props);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.contactMenuButton = new Button({
      buttonText: 'Меню собеседника',
      buttonType: 'button',
      className: 'contactMenu-button',
      contactMenuImgSrc: new URL('../../../../../img/contactMenu.svg', import.meta.url),
      events: {
        click: [(e: Event) => {
          const contactMenuPanel = (e.currentTarget as HTMLElement).parentNode?.querySelector('.contactMenu-panel');
          contactMenuPanel?.toggleAttribute('hidden');
        }],
      },
    });

    hideMenuOnClickOutsideThePanel();
  }

  render() {
    const { props } = this;
    return this.compile(contentInfoTemplate, { ...props });
  }
}
