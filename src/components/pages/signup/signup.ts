import signupTemplate from './signup.hbs';
import Component from '../../../utils/component';
import LinkAway from '../../partials/linkAway';
import InputField from '../../partials/inputField';
import LoginPage from '../login';
import { IInputFieldProps } from '../../partials/inputField/inputField';
import renderDOM from '../../../utils/renderDOM';
import {
  validateEmail, validateLogin,
  validateName, validatePassword,
  validatePasswordMatch, validatePhoneNumber,
} from '../../../utils/validationRules';
import DataForm from '../../partials/dataForm';
import { SignupController } from '../../../data/signupController';

export class SignupPage extends Component {
  constructor() {
    super();
    document.title = 'Регистрация';
  }

  protected initChildren() {
    const inputFieldEmail = new InputField({
      fieldName: 'email',
      fieldPlaceholder: 'Почта',
      fieldType: 'email',
      isValidate: true,
      validateHandler: (value) => validateEmail(value),
    });
    const inputFieldLogin = new InputField({
      fieldName: 'login',
      fieldPlaceholder: 'Логин',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateLogin(value),
    });
    const inputFieldFirstName = new InputField({
      fieldName: 'first_name',
      fieldPlaceholder: 'Имя',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateName(value),
    });
    const inputFieldSecondName = new InputField({
      fieldName: 'second_name',
      fieldPlaceholder: 'Фамилия',
      fieldType: 'text',
      isValidate: true,
      validateHandler: (value) => validateName(value),
    });
    const inputFieldPhone = new InputField({
      fieldName: 'phone',
      fieldPlaceholder: 'Телефон',
      fieldType: 'tel',
      isValidate: true,
      validateHandler: (value) => validatePhoneNumber(value),
    });
    const inputFieldPassword = new InputField({
      fieldName: 'password',
      fieldPlaceholder: 'Пароль',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value: string) => validatePassword(value),
    });
    const inputFieldConfirmPassword = new InputField({
      fieldName: 'confirmPassword',
      fieldPlaceholder: 'Пароль (еще раз)',
      fieldType: 'password',
      isValidate: true,
    });

    inputFieldPassword.props.validateHandler = (value: string) => validatePassword(value);
    inputFieldPassword.props.boundFieldHandler = () => (
      inputFieldConfirmPassword.getContent().dispatchEvent(new Event('focusout')));

    inputFieldConfirmPassword.props.validateHandler = (value: string) => validatePasswordMatch(
      value ?? '',
      (inputFieldPassword.props as IInputFieldProps).value ?? '',
    );

    this.children.formData = new DataForm({
      formClass: 'form-enter',
      inputFields: [
        inputFieldEmail,
        inputFieldLogin,
        inputFieldFirstName,
        inputFieldSecondName,
        inputFieldPhone,
        inputFieldPassword,
        inputFieldConfirmPassword,
      ],
      submitButtonProps: {
        name: 'register',
        title: 'Зарегистрироваться',
      },
      dataFormHandler: (formData) => new SignupController().signup(formData),
    });

    this.children.linkAway = new LinkAway({
      title: 'Перейти к авторизации',
      linkHref: '#',
      linkText: 'Войти',
      name: 'login',
      className: 'link-away',
      events: {
        click: () => {
          renderDOM('#app', new LoginPage());
        },
      },
    });
  }

  render() {
    return this.compile(signupTemplate, this.props);
  }
}
