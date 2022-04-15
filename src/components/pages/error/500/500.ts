import error500Template from './500.hbs';
import Component from '../../../../utils/component';
import ErrorPageContent from '../modules';

export default class Error404 extends Component {
  constructor() {
    super();
    document.title = 'Error 500';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.errorPageContent = new ErrorPageContent({
      errorCode: '500',
      errorText: 'Внутренняя ошибка сервера',
    });
  }

  render() {
    const { props } = this;
    return this.compile(error500Template, { ...props });
  }
}
