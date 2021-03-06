import error404Template from './404.hbs';
import Component from '../../../../utils/component';
import ErrorPageContent from '../modules';

export class Error404 extends Component {
  constructor() {
    super();
    document.title = 'Error 404';
  }

  protected initChildren() {
    this.children.errorPageContent = new ErrorPageContent({
      errorCode: '404',
      errorText: 'Страница не найдена',
    });
  }

  render() {
    return this.compile(error404Template, this.props);
  }
}
