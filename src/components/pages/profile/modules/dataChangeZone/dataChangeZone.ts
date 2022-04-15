import dataChangeZoneTemplate from './dataChangeZone.hbs';
import Component from '../../../../../utils/component';
import ControlZone from '../controlZone';
import DataForm from '../../../../partials/dataForm';
import InputField from '../../../../partials/inputField';
import { profileData } from '../../../../../data/profileData';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhoneNumber,
} from '../../../../../utils/validationRules';

export default class DataChangeZone extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    const inputFieldFirstName = new InputField({
      fieldName: 'first_name',
      fieldPlaceholder: 'Имя',
      fieldType: 'text',
      isValidate: true,
      value: profileData.first_name,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validateName(value),
    });
    const inputFieldSecondName = new InputField({
      fieldName: 'second_name',
      fieldPlaceholder: 'Фамилия',
      fieldType: 'text',
      isValidate: true,
      value: profileData.second_name,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validateName(value),
    });
    const inputFieldDisplayName = new InputField({
      fieldName: 'display_name',
      fieldPlaceholder: 'Имя в чате',
      fieldType: 'text',
      isValidate: true,
      value: profileData.display_name,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validateName(value),
    });
    const inputFieldLogin = new InputField({
      fieldName: 'login',
      fieldPlaceholder: 'Логин',
      fieldType: 'text',
      isValidate: true,
      value: profileData.login,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validateLogin(value),
    });
    const inputFieldEmail = new InputField({
      fieldName: 'email',
      fieldPlaceholder: 'Почта',
      fieldType: 'email',
      isValidate: true,
      value: profileData.email,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validateEmail(value),
    });
    const inputFieldPhone = new InputField({
      fieldName: 'phone',
      fieldPlaceholder: 'Телефон',
      fieldType: 'tel',
      isValidate: true,
      value: profileData.phone,
      isReadOnly: true,
      isLabelShown: true,
      withoutBorder: true,
      validateHandler: (value) => validatePhoneNumber(value),
    });
    this.children.profileDataform = new DataForm({
      inputFields: [
        inputFieldFirstName,
        inputFieldSecondName,
        inputFieldDisplayName,
        inputFieldLogin,
        inputFieldEmail,
        inputFieldPhone,
      ],
      formClass: 'contact-profile-container',
      submitButtonProps: {
        name: 'saveChanges',
        title: 'Сохранить изменения',
        hiddenInput: true,
      },
    });
    this.children.controlZone = new ControlZone();
  }

  render() {
    const { props } = this;
    return this.compile(dataChangeZoneTemplate, { ...props });
  }
}
