import Component, { IProperties } from '../../../../../utils/component';
import contentInfoTemplate from './contentInfo.hbs';
import './contentInfo.scss';

interface IContentInfo extends IProperties{
  contactInfo?: contactData,
}

export default class ContentInfo extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IContentInfo) {
    super(props);
  }

  render() {
    const { props } = this;
    return this.compile(contentInfoTemplate, {
      ...props,
      contactMenuSrc: new URL('../../../../../img/contactMenu.svg', import.meta.url),
    });
  }
}
