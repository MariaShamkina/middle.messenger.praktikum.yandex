import passwordChangeZoneTemplate from './passwordChangeZone.hbs';
import Component from '../../../../../utils/component';
import InputField from '../../../../partials/inputField';
import SubmitButton from '../../../../partials/submitButton';
import {
  InvalidFormData,
  validatePassword,
  validatePasswordMatch,
} from '../../../../../utils/validationRules';
import { IInputFieldProps } from '../../../../partials/inputField/inputField';
import ProfilePage from '../../profile';
import renderDOM from '../../../../../utils/renderDOM';

export default class PasswordChangeZone extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.hide();
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.inputField_oldPassword = new InputField({
      fieldName: 'oldPassword',
      fieldPlaceholder: 'Старый пароль',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value) => validatePassword(value),
    });
    this.children.inputField_newPassword = new InputField({
      fieldName: 'newPassword',
      fieldPlaceholder: 'Новый пароль',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value) => validatePassword(value),
      // boundFieldHandler: () => (this.children.inputField_confirmPassword as Component)?
      // .getContent().dispatchEvent(new Event('focusout')),
      // todo поправить баг с перепроверкой повторного пароля после изменения основного
    });
    this.children.inputField_confirmPassword = new InputField({
      fieldName: 'confirm-password',
      fieldPlaceholder: 'Новый пароль (еще раз)',
      fieldType: 'password',
      isValidate: true,
      validateHandler: (value) => validatePasswordMatch(
        value,
        ((this.children.inputField_newPassword as Component).props as IInputFieldProps).value ?? '',
      ),
    });
    this.children.submitButton = new SubmitButton({
      name: 'changePassword',
      title: 'Изменить пароль',
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
    return this.compile(passwordChangeZoneTemplate, { ...props });
  }
}
