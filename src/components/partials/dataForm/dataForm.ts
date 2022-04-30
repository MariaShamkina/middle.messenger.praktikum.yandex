import dataFormTemplate from './dataForm.hbs';
import Component, { IProperties } from '../../../utils/component';
import { getInvalidInputs } from '../../../utils/validationRules';
import InputField from '../inputField';
import { ISubmitButtonProps } from '../submitButton/submitButton';
import { convertToArray } from '../../../utils/helpers';
import { LoginController } from '../../../data/loginController';
import ErrorBlock from '../errorBlock';
import SubmitButton from '../submitButton';
import { IErrorBlockProps } from '../errorBlock/errorBlock';

interface IDataFormProps extends IProperties{
  formClass: string;
  inputFields: InputField[];
  submitButtonProps: ISubmitButtonProps;
}

export class DataForm extends Component<IDataFormProps> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IDataFormProps) {
    const changedProps = { ...props };
    if (!changedProps.events) {
      changedProps.events = {};
    }
    const { events } = changedProps;

    events.submit = convertToArray<EventHandler>(events.submit);
    events.submit.push((e: Event) => {
      e.preventDefault();
      if (document.activeElement && document.activeElement.classList.contains('input-field')) {
        document.activeElement.closest('.form-field-wrapper')?.dispatchEvent(new Event('focusout'));
      }

      const invalidInputs = getInvalidInputs(this.children);
      const serverErrorBlock = (this.children.submitButton as Component)
        .children.serverErrorBlock as ErrorBlock;
      if (invalidInputs.length === 0) {
        const formData = new FormData(this.getContent() as HTMLFormElement);
        new LoginController().login(formData).then((errorMessage) => {
          if (errorMessage !== '') {
            (serverErrorBlock.props as IErrorBlockProps).errorsText = [errorMessage];
            serverErrorBlock.show();
          }
        });
      } else {
        serverErrorBlock.hide();
        invalidInputs.forEach(
          (el: Component) => el.getContent().dispatchEvent(new Event('focusout')),
        );
      }
    });
    super(changedProps);
  }

  protected initChildren() {
    const props = this.props as IDataFormProps;
    this.children.submitButton = new SubmitButton(props.submitButtonProps);
  }

  render() {
    return this.compile(dataFormTemplate, this.props);
  }
}
