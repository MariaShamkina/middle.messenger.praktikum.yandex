import profileDataChangeZoneTemplate from './profileDataZone.hbs';
import Component from '../../../../../utils/component';
import InputField from '../../../../partials/inputField';
import SubmitButton from '../../../../partials/submitButton';
import {
  InvalidFormData,
  validateEmail,
  validateLogin,
  validateName,
  validatePhoneNumber,
} from '../../../../../utils/validationRules';
import { profileData } from '../../../../../data/profileData';
import ProfilePage from '../../index';
import renderDOM from '../../../../../utils/renderDOM';

export default class ProfileDataZone extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.inputField_firstName = new InputField({
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
    this.children.inputField_secondName = new InputField({
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
    this.children.inputField_displayName = new InputField({
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
    this.children.inputField_login = new InputField({
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
    this.children.inputField_email = new InputField({
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
    this.children.inputField_phone = new InputField({
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
    this.children.submitButton = new SubmitButton({
      name: 'saveChanges',
      title: 'Сохранить изменения',
      hiddenInput: true,
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
            renderDOM('#app', new ProfilePage());
          } else {
            invalidInputs.forEach(
              (el:Component) => el.getContent().dispatchEvent(new Event('focusout')),
            );
          }
        }],
      },
    });
  }

  render() {
    const { props } = this;
    return this.compile(profileDataChangeZoneTemplate, { ...props });
  }
}
