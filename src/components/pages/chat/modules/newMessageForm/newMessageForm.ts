import Component from '../../../../../utils/component';
import messageDashboardTemplate from './newMessageForm.hbs';
import './newMessageForm.scss';
import SubmitButton from '../../../../partials/submitButton';
import { InvalidFormData, messageValidation } from '../../../../../utils/validationRules';
import TextArea from '../../../../partials/textArea';

export default class NewMessageForm extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.textAreaNewMessage = new TextArea({
      textareaName: 'new-message',
      inputName: 'message',
      textareaPlaceholder: 'Сообщение',
      isValidate: true,
      validateHandler: (value) => messageValidation(value),
    });
    this.children.submitButton = new SubmitButton({
      name: 'sendMessage',
      title: 'Отправить сообщение',
      submitButtonIconSrc: new URL('../../../../../img/send-comment.svg', import.meta.url),
      events: { // todo enter неправильно работает
        click: [(e: Event) => {
          e.preventDefault();
          const invalidInputs = InvalidFormData.bind(this)();
          if (invalidInputs.length === 0) {
            const formData = Array.from(new FormData(
                (e.target as HTMLElement).closest('form') as HTMLFormElement,
            ).entries());
            // eslint-disable-next-line no-console
            console.log(formData);
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
    return this.compile(messageDashboardTemplate, {
      ...props,
      fileIconSrc: new URL('../../../../../img/add_file.svg', import.meta.url),
    });
  }
}
