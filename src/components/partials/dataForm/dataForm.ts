import dataFormTemplate from './dataForm.hbs';
import Component, { IProperties } from '../../../utils/component';
import { getInvalidInputs } from '../../../utils/validationRules';
import renderDOM from '../../../utils/renderDOM';
import ChatPage from '../../pages/chat';
import InputField from '../inputField';
import { SubmitButton, ISubmitButtonProps } from '../submitButton/submitButton';
import { convertToArray, getFormValueByName } from '../../../utils/helpers';
import {LoginController} from "../../../data/loginController";
import ErrorBlock from "../errorBlock";

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
      if (invalidInputs.length === 0) {
        new LoginController().login(new FormData(this.getContent() as HTMLFormElement));
      } else {
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
    this.children.errorBlock = new ErrorBlock({
      errorsText: this.props.errorsText as string[],
    });
  }

  render() {
    return this.compile(dataFormTemplate, this.props);
  }
}
