import passwordChangeZoneTemplate from './passwordChangeZone.hbs';
import Component from '../../../../../utils/component';
import InputField from '../../../../partials/inputField';
import {
  validatePassword,
  validatePasswordMatch,
} from '../../../../../utils/validationRules';
import { IInputFieldProps } from '../../../../partials/inputField/inputField';
import DataForm from '../../../../partials/dataForm';

export class PasswordChangeZone extends Component {
  constructor() {
    super();
    this.hide();
  }

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

    this.children.passwordChangeForm = new DataForm({
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
    return this.compile(passwordChangeZoneTemplate, this.props);
  }
}
