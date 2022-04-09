import signinTemplate from './signin.hbs';
import Component from '../../../utils/component';
import renderDOM from '../../../utils/renderDOM';
import SubmitButton from '../../partials/submitButton';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField';
import LoginPage from '../login';

export default class SigninPage extends Component {
  constructor() {
    super();
    document.title = 'Регистрация';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.inputField_email = new InputField({
      fieldName: 'email', fieldPlaceholder: 'Почта', fieldType: 'email',
    });
    this.children.inputField_login = new InputField({
      fieldName: 'login', fieldPlaceholder: 'Логин', fieldType: 'text',
    });
    this.children.inputField_first_name = new InputField({
      fieldName: 'first_name', fieldPlaceholder: 'Имя', fieldType: 'text',
    });
    this.children.inputField_second_name = new InputField({
      fieldName: 'second_name', fieldPlaceholder: 'Фамилия', fieldType: 'text',
    });
    this.children.inputField_phone = new InputField({
      fieldName: 'phone', fieldPlaceholder: 'Телефон', fieldType: 'tel',
    });
    this.children.inputField_password = new InputField({
      fieldName: 'password', fieldPlaceholder: 'Пароль', fieldType: 'password',
    });
    this.children.inputField_confirmPassword = new InputField({
      fieldName: 'confirmPassword',
      fieldPlaceholder: 'Пароль (еще раз)',
      fieldType: 'password',
      isValidate: true,
    });
    this.children.submitButton = new SubmitButton({
      name: 'register',
      title: 'Зарегистрироваться',
      events: {
        click: [(e: Event) => {
          e.preventDefault();
        }],
      },
    });
    this.children.linkAway = new LinkAway({
      linkHref: '#',
      linkText: 'Войти',
      name: 'login',
      className: 'link-away',
      events: {
        click: [() => {
          renderDOM('#app', new LoginPage());
        }],
      },
    });
  }

  render() {
    const { props } = this;
    return this.compile(signinTemplate, { ...props });
  }
}
