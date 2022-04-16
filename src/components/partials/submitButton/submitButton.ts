import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './submitButton.hbs';

export interface ISubmitButtonProps extends IProperties{
    name: string;
    title: string;
    hiddenInput?: boolean;
    submitButtonIconSrc?: URL;
}

export class SubmitButton extends Component<ISubmitButtonProps> {
  render() {
    return this.compile(buttonTemplate, this.props);
  }
}
