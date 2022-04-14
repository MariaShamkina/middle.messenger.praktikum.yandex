import loginTemplate from './login.hbs';
import Component from '../../../utils/component';
import SigninPage from '../signin';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField/inputField';
import renderDOM from '../../../utils/renderDOM';
import {
  validateLogin,
  validatePassword,
} from '../../../utils/validationRules';
import DataForm from '../../partials/dataForm';

export default class LoginPage extends Component {
  constructor() {
    super();
    document.title = 'Авторизация';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  initChildren() {
    this.children.formData = new DataForm({
      formClass: 'form-enter',
      inputFields: [
        new InputField({
          fieldName: 'login',
          fieldPlaceholder: 'Логин',
          fieldType: 'text',
          isValidate: true,
          validateHandler: (value: string) => validateLogin(value),
        }),
        new InputField({
          fieldName: 'password',
          fieldPlaceholder: 'Пароль',
          fieldType: 'password',
          isValidate: true,
          validateHandler: (value: string) => validatePassword(value),
        }),
      ],
      submitButtonProps: {
        name: 'enter',
        title: 'Войти',
      },
    });

    this.children.linkAway = new LinkAway({
      title: 'Перейти к регистрации',
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
