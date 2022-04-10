import Component, { IProperties } from '../../../utils/component';
import textAreaTemplate from './textArea.hbs';

export interface ITextAreaProps extends IProperties{
    textareaName: string;
    inputName: string;
    textareaPlaceholder: string;
    errorImgSrc?: URL;
    value?: string;
    errorsText?: string[];
    isValidate?: boolean;
    validateHandler?: validationHandler;
    boundFieldHandler?: eventHandler;
}

function displayErrors(inputWrapper: HTMLElement) {
  inputWrapper?.classList.add('error-field');

  const errorFieldWrapper: HTMLElement | null = inputWrapper.querySelector('.wrapper-error-field');
  errorFieldWrapper?.removeAttribute('hidden');
}

function hideErrors(e: Event) {
  const inputWrapper = e.currentTarget as HTMLElement;
  inputWrapper?.classList.remove('error-field');

  const errorFieldWrapper: HTMLElement | null = inputWrapper.querySelector('.wrapper-error-field');
  errorFieldWrapper?.setAttribute('hidden', '');
}

function displayErrorText(e: Event) {
  if (!(e.target as HTMLElement).classList.contains('error-field-img')) return;
  const errorText: HTMLElement | null = (e.currentTarget as HTMLElement).querySelector('.error-text-absolute');
  errorText?.toggleAttribute('hidden');
}

export default class TextArea extends Component {
  constructor(props: ITextAreaProps) {
    const changedProps = { ...props };
    if (changedProps.isValidate) {
      if (!changedProps.events) changedProps.events = {};
      (changedProps.events.click = changedProps.events.click || [])
        .push((e: Event) => displayErrorText(e));
      (changedProps.events.focusin = changedProps.events.focus || [])
        .push((e: Event) => hideErrors(e));
      (changedProps.events.focusout = changedProps.events.blur || [])
        .push((e: Event) => {
          const value = (e.target as HTMLInputElement).value ?? '';
          this.props.value = value.trim();
          const { state } = this;
          if (!state.isValid) displayErrors(this.getContent());
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
    const props = this.props as ITextAreaProps;
    return this.compile(textAreaTemplate, {
      ...props,
      errorImgSrc: new URL('../../../img/box-important--v1.png', import.meta.url),
    });
  }
}