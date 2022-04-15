import dataFormTemplate from './dataForm.hbs';
import Component, { IProperties } from '../../../utils/component';
import { InvalidFormData } from '../../../utils/validationRules';
import renderDOM from '../../../utils/renderDOM';
import ChatPage from '../../pages/chat';
import InputField from '../inputField';
import SubmitButton, { ISubmitButtonProps } from '../submitButton/submitButton';

interface IDataFormProps extends IProperties{
  formClass: string;
  inputFields: InputField[];
  submitButtonProps: ISubmitButtonProps;
}

export default class DataForm extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IDataFormProps) {
    props.events = props.events || {};
    props.events.submit = [(e: Event) => {
      e.preventDefault();
      if (document.activeElement && document.activeElement.classList.contains('input-field')) {
        document.activeElement.closest('.form-field-wrapper')?.dispatchEvent(new Event('focusout'));
      }
      const invalidInputs = InvalidFormData.bind(this)();
      if (invalidInputs.length === 0) {
        const formData = Array.from(new FormData(this.getContent() as HTMLFormElement)
          .entries());
        // eslint-disable-next-line no-console
        console.log(formData);
        renderDOM('#app', new ChatPage());//todo рендеринг на разные страницы должен быть
      } else {
        invalidInputs.forEach(
          (el: Component) => el.getContent().dispatchEvent(new Event('focusout')),
        );
      }
    }];
    super(props);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    const props = this.props as IDataFormProps;
    this.children.submitButton = new SubmitButton(props.submitButtonProps);
  }

  render() {
    const { props } = this;
    return this.compile(dataFormTemplate, { ...props });
  }
}
