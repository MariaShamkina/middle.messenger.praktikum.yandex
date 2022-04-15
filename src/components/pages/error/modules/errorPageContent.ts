import errorPageContentTemplate from './errorPageContent.hbs';
import Component, { IProperties } from '../../../../utils/component';
import LinkAway from '../../../partials/linkAway';
import renderDOM from '../../../../utils/renderDOM';
import ChatPage from '../../chat';

interface IErrorPageContent extends IProperties{
    errorCode: string;
    errorText: string;
}

export default class ErrorPageContent extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IErrorPageContent) {
    super(props);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.linkToGoBack = new LinkAway({
      className: 'linkToGoBack',
      linkHref: '#',
      linkText: 'Вернуться на главную',
      name: 'linkToGoBack',
      title: 'Вернуться на главную',
      events: {
        click: [() => {
          renderDOM('#app', new ChatPage());
        }],
      },
    });
  }

  render() {
    const props = this.props as IErrorPageContent;
    return this.compile(errorPageContentTemplate, { ...props });
  }
}
