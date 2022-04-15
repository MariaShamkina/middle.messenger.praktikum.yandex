import Component from '../../../../../utils/component';
import messageDashboardTemplate from './newMessageForm.hbs';
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
      events: {
        keyup: [(e: Event) => {
          const textarea = e.target as HTMLElement;
          const styles = getComputedStyle(textarea);
          textarea.style.height = '0';
          const minHeightArea = parseInt(styles.minHeight, 10);
          const newHeight = textarea.scrollHeight;
          textarea.style.height = `${(newHeight > minHeightArea) ? newHeight : minHeightArea}px`;
        }],
      },
    });
    this.children.submitButton = new SubmitButton({
      name: 'sendMessage',
      title: 'Отправить сообщение',
      hiddenInput: true,
      submitButtonIconSrc: new URL('../../../../../img/send-comment.svg', import.meta.url),
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
