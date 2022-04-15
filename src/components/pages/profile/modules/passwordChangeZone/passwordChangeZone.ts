import passwordChangeZoneTemplate from './passwordChangeZone.hbs';
import Component from '../../../../../utils/component';
import InputField from '../../../../partials/inputField';
import {
  validatePassword,
  validatePasswordMatch,
} from '../../../../../utils/validationRules';
import { IInputFieldProps } from '../../../../partials/inputField/inputField';
import DataForm from '../../../../partials/dataForm';

export default class PasswordChangeZone extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.hide();
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    const inputFieldOldPassword = new InputField({
      fieldName: 'oldPassword',
      fieldPlaceholder: 'Старый пароль',
      fieldType: 'password',
      isValidate: true,
      withoutBorder: true,
      validateHandler: (value) => validatePassword(value),
    });
    const inputFieldNewPassword = new InputField({
      fieldName: 'newPassword',
      fieldPlaceholder: 'Новый пароль',
      fieldType: 'password',
      isValidate: true,
      withoutBorder: true,
      validateHandler: (value) => validatePassword(value),
    });
    const inputFieldConfirmPassword = new InputField({
      fieldName: 'confirm-password',
      fieldPlaceholder: 'Новый пароль (еще раз)',
      fieldType: 'password',
      isValidate: true,
      withoutBorder: true,
    });
    inputFieldNewPassword.props.validateHandler = (value: string) => validatePassword(value);
    inputFieldNewPassword.props.boundFieldHandler = () => (
      inputFieldConfirmPassword.getContent().dispatchEvent(new Event('focusout')));

    inputFieldConfirmPassword.props.validateHandler = (value: string) => validatePasswordMatch(
      value,
      (inputFieldNewPassword.props as IInputFieldProps).value ?? '',
    );

    this.children.passwordChangeform = new DataForm({
      formClass: 'contact-profile-container',
      inputFields: [
        inputFieldOldPassword,
        inputFieldNewPassword,
        inputFieldConfirmPassword,
      ],
      submitButtonProps: {
        name: 'changePassword',
        title: 'Изменить пароль',
      },
    });
  }

  render() {
    const { props } = this;
    return this.compile(passwordChangeZoneTemplate, { ...props });
  }
}
