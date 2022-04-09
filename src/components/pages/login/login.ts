import loginTemplate from './login.hbs';
import Component from '../../../utils/component';
import SigninPage from '../signin';
import ChatPage from '../chat';
import SubmitButton from '../../partials/submitButton';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField/inputField';
import renderDOM from '../../../utils/renderDOM';
import {
  InvalidFormData,
  validateLogin,
  validatePassword,
} from '../../../utils/validationRules';

export default class LoginPage extends Component {
  constructor() {
    super();
    document.title = 'Авторизация';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  initChildren() {
    this.children.inputField_login = new InputField({
      fieldName: 'login',
      fieldPlaceholder: 'Логин',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value: string) => validateLogin(value),
    });
    this.children.inputField_password = new InputField({
      fieldName: 'password',
      fieldPlaceholder: 'Пароль',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value: string) => validatePassword(value),
    });
    this.children.submitButton = new SubmitButton({
      name: 'enter',
      title: 'Войти',
      events: {
        click: [(e: Event) => {
          e.preventDefault();
          const invalidInputs = InvalidFormData.bind(this)();
          if (invalidInputs.length === 0) {
            const formData = Array.from(new FormData(
                (e.target as HTMLElement).closest('form') as HTMLFormElement,
            ).entries());
            // eslint-disable-next-line no-console
            formData.forEach((pair) => console.log(pair));
            renderDOM('#app', new ChatPage());
          } else {
            invalidInputs.forEach(
              (el:Component) => el.getContent().dispatchEvent(new Event('focusout')),
            );
          }
        }],
      },
    });
    this.children.linkAway = new LinkAway({
      linkHref: '#',
      linkText: 'Создать профиль',
      name: 'register',
      className: 'link-away',
      events: {
        click: [() => {
          renderDOM('#app', new SigninPage());
        }],
      },
    });
  }

  render() {
    const { props } = this;
    return this.compile(loginTemplate, { ...props });
  }
}
