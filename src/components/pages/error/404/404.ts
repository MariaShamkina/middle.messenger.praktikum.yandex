import error404Template from './404.hbs';
import Component from '../../../../utils/component';
import ErrorPageContent from '../modules';

export default class Error404 extends Component {
  constructor() {
    super();
    document.title = 'Error 404';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.errorPageContent = new ErrorPageContent({
      errorCode: '404',
      errorText: 'Страница не найдена',
    });
  }

  render() {
    const { props } = this;
    return this.compile(error404Template, { ...props });
  }
}
