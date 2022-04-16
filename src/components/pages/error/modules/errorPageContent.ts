import errorPageContentTemplate from './errorPageContent.hbs';
import Component, { IProperties } from '../../../../utils/component';
import LinkAway from '../../../partials/linkAway';
import renderDOM from '../../../../utils/renderDOM';
import ChatPage from '../../chat';

interface IErrorPageContent extends IProperties{
    errorCode: string;
    errorText: string;
}

export class ErrorPageContent extends Component<IErrorPageContent> {
  protected initChildren() {
    this.children.linkToGoBack = new LinkAway({
      className: 'linkToGoBack',
      linkHref: '#',
      linkText: 'Вернуться на главную',
      name: 'linkToGoBack',
      title: 'Вернуться на главную',
      events: {
        click: () => {
          renderDOM('#app', new ChatPage());
        },
      },
    });
  }

  render() {
    return this.compile(errorPageContentTemplate, this.props);
  }
}
