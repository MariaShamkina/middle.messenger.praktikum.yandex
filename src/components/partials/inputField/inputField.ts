import Component, { IProperties } from '../../../utils/component';
import inputFieldTemplate from './inputField.hbs';
import { convertToArray } from '../../../utils/helpers';
import ErrorBlock from '../errorBlock';

export interface IInputFieldProps extends IProperties{
    fieldName: string;
    fieldPlaceholder: string;
    fieldType: string;
    value?: string;
    isValidate?: boolean;
    errorsText?: string[];
    validateHandler?: ValidationHandler;
    boundFieldHandler?: EventHandler;
    withoutBorder?: boolean;
    isReadOnly?: boolean;
    isLabelShown?: boolean;
    fileAcceptTypes?: string;
}

function displayErrors(inputWrapper: HTMLElement, errorBlock: ErrorBlock) {
  inputWrapper.classList.add('error-field');
  errorBlock.show();
}

function hideErrors(inputWrapper: HTMLElement, errorBlock: ErrorBlock) {
  inputWrapper.classList.remove('error-field');
  errorBlock.hide();
}

export class InputField extends Component<IInputFieldProps> {
  constructor(props: IInputFieldProps) {
    const changedProps = { ...props };
    if (changedProps.isValidate) {
      if (!changedProps.events) {
        changedProps.events = {};
      }
      const { events } = changedProps;

      events.focusin = convertToArray<EventHandler>(events.focusin);
      events.focusin.push(() => hideErrors(
        this.getContent(),
        this.children.errorBlock as ErrorBlock,
      ));

      events.focusout = convertToArray<EventHandler>(events.focusout);
      events.focusout.push((e: Event) => {
        const value = ((e.currentTarget as HTMLElement).querySelector('input') as HTMLInputElement).value ?? '';
        this.props.value = value.trim();
        if (!this.state.isValid) {
          displayErrors(this.getContent(), this.children.errorBlock as ErrorBlock);
        }
      });

      if (changedProps.validateHandler) {
        changedProps.errorsText = changedProps.validateHandler(changedProps.value ?? '');
        // changedProps.isValid = changedProps.errorsText.length === 0;
      }
    }

    super(changedProps);

    if (changedProps.isValidate) this.state.isValid = (changedProps.errorsText ?? []).length === 0;
  }

  protected initChildren() {
    if (this.props.isValidate) {
      this.children.errorBlock = new ErrorBlock({
        errorsText: this.props.errorsText as string[] ?? [],
      });
    }
  }

  protected componentDidUpdate(oldProp: unknown, newProp: unknown, propName: string): boolean {
    const props = this.props as IInputFieldProps;

    if (propName === 'value' && props.validateHandler) {
      props.errorsText = props.validateHandler(newProp as string);
      (this.children.errorBlock as Component).props.errorsText = props.errorsText;
      this.state.isValid = props.errorsText.length === 0;
    }

    return !(oldProp === newProp);
  }

  protected componentRenderFinished() {
    const props = this.props as IInputFieldProps;
    if (props.boundFieldHandler) props.boundFieldHandler();
  }

  render() {
    return this.compile(inputFieldTemplate, this.props);
  }
}
