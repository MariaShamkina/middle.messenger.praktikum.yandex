import signinTemplate from './signin.hbs';
import Component from '../../../utils/component';
import SubmitButton from '../../partials/submitButton';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField';
import LoginPage from '../login';
import { IInputFieldProps } from '../../partials/inputField/inputField';
import renderDOM from '../../../utils/renderDOM';
import {
  InvalidFormData,
  validateEmail, validateLogin,
  validateName, validatePassword,
  validatePasswordMatch, validatePhoneNumber,
} from '../../../utils/validationRules';
import ChatPage from '../chat';

export default class SigninPage extends Component {
  constructor() {
    super();
    document.title = 'Регистрация';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.inputField_email = new InputField({
      fieldName: 'email',
      fieldPlaceholder: 'Почта',
      fieldType: 'email',
      isValidate: true,
      validateHandler: (value) => validateEmail(value),
    });
    this.children.inputField_login = new InputField({
      fieldName: 'login',
      fieldPlaceholder: 'Логин',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateLogin(value),
    });
    this.children.inputField_first_name = new InputField({
      fieldName: 'first_name',
      fieldPlaceholder: 'Имя',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateName(value),
    });
    this.children.inputField_second_name = new InputField({
      fieldName: 'second_name',
      fieldPlaceholder: 'Фамилия',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateName(value),
    });
    this.children.inputField_phone = new InputField({
      fieldName: 'phone',
      fieldPlaceholder: 'Телефон',
      fieldType: 'tel',
      isValidate: true,
      validateHandler: (value) => validatePhoneNumber(value),
    });
    this.children.inputField_password = new InputField({
      fieldName: 'password',
      fieldPlaceholder: 'Пароль',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value) => validatePassword(value),
      // boundFieldHandler: () => (this.children.inputField_confirmPassword as Component)?
      // .getContent().dispatchEvent(new Event('focusout')),
      // todo поправить баг с перепроверкой повторного пароля после изменения основного
    });
    this.children.inputField_confirmPassword = new InputField({
      fieldName: 'confirmPassword',
      fieldPlaceholder: 'Пароль (еще раз)',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value) => validatePasswordMatch(
        value,
        ((this.children.inputField_password as Component).props as IInputFieldProps).value ?? '',
      ),
    });
    this.children.submitButton = new SubmitButton({
      name: 'register',
      title: 'Зарегистрироваться',
      events: {
        click: [(e: Event) => {
          e.preventDefault();
          const invalidInputs = InvalidFormData.bind(this)();
          if (invalidInputs.length === 0) {
            const formData = Array.from(new FormData(
                (e.target as HTMLElement).closest('form') as HTMLFormElement,
            ).entries());
            // eslint-disable-next-line no-console
            console.log(formData);
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
      title: 'Перейти к авторизации',
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
