import error500Template from './500.hbs';
import Component from '../../../../utils/component';
import ErrorPageContent from '../modules';

export class Error500 extends Component {
  constructor() {
    super();
    document.title = 'Error 500';
  }

  protected initChildren() {
    this.children.errorPageContent = new ErrorPageContent({
      errorCode: '500',
      errorText: 'Внутренняя ошибка сервера',
    });
  }

  render() {
    return this.compile(error500Template, this.props);
  }
}
