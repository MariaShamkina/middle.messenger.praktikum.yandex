import Component, { IProperties } from '../../../utils/component';
import textAreaTemplate from './textArea.hbs';
import { convertToArray } from '../../../utils/helpers';

export interface ITextAreaProps extends IProperties{
    textareaName: string;
    inputName: string;
    textareaPlaceholder: string;
    value?: string;
    isValidate?: boolean;
    errorsText?: string[];
    validateHandler?: ValidationHandler;
}

export class TextArea extends Component<ITextAreaProps> {
  constructor(props: ITextAreaProps) {
    const changedProps = { ...props };
    if (changedProps.isValidate) {
      if (!changedProps.events) {
        changedProps.events = {};
      }
      const { events } = changedProps;

      events.focusout = convertToArray<EventHandler>(events.focusout);
      events.focusout.push((e: Event) => {
        const value = (e.target as HTMLInputElement).value ?? '';
        this.props.value = value.trim();
      });
    }
    if (changedProps.isValidate && changedProps.validateHandler) {
      changedProps.errorsText = changedProps.validateHandler(changedProps.value ?? '');
    }
    super(changedProps);
    if (changedProps.isValidate) this.state.isValid = changedProps.errorsText?.length === 0;
  }

  protected componentDidUpdate(oldProp: unknown, newProp: unknown, propName: string): boolean {
    const props = this.props as ITextAreaProps;
    if (propName === 'value' && props.validateHandler) {
      props.errorsText = props.validateHandler(newProp as string);
      this.state.isValid = props.errorsText.length === 0;
      return true;
    }
    return oldProp !== newProp;
  }

  render() {
    return this.compile(textAreaTemplate, this.props);
  }
}
