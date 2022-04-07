import Component from '../../../utils/component';
import loginTemplate from './login.hbs';
import SubmitButton from '../../partials/submitButton';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField';
import './login.scss';
import { displayErrors } from '.';

export class LoginPage extends Component {
  initChildren() {
    this.children.inputField_login = new InputField({
      fieldName: 'login',
      fieldPlaceholder: 'Логин',
      fieldType: 'text',
      isValidate: true,
      events: {
        click: (e: Event) => {
          displayErrors(e, 'Test');
        },
      },
    });
    this.children.inputField_password = new InputField({
      fieldName: 'password',
      fieldPlaceholder: 'Пароль',
      fieldType: 'password',
    });
    this.children.submitButton = new SubmitButton({
      name: 'enter',
      title: 'Войти',
      events: {
        click: (e: Event) => {
          e.preventDefault();
        },
      },
    });
    this.children.linkAway = new LinkAway({
      labelText: 'Впервые? ',
      linkHref: '../signin/signin.shbs',
      linkText: 'Создать профиль',
      name: 'register',
    });
  }

  render() {
    return this.compile(loginTemplate, {});
  }
}
