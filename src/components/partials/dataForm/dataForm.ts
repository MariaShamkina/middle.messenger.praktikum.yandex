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
    super(props);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    const props = this.props as IDataFormProps;
    this.children.submitButton = new SubmitButton({
      name: props.submitButtonProps.name,
      title: props.submitButtonProps.title,
      events: {
        click: [(e: Event) => {
          e.preventDefault();
          const invalidInputs = InvalidFormData.bind(this)();
          if (invalidInputs.length === 0) {
            const formData = Array.from(new FormData(this.getContent() as HTMLFormElement)
              .entries());
            // eslint-disable-next-line no-console
            console.log(formData);
            renderDOM('#app', new ChatPage());
          } else {
            invalidInputs.forEach(
              (el: Component) => el.getContent().dispatchEvent(new Event('focusout')),
            );
          }
        }],
      },
    });
  }

  render() {
    const { props } = this;
    return this.compile(dataFormTemplate, { ...props });
  }
}
