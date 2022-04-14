import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './submitButton.hbs';

export interface ISubmitButtonProps extends IProperties{
    name: string;
    title: string;
    hiddenInput?: boolean;
    submitButtonIconSrc?: URL;
}

export default class SubmitButton extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ISubmitButtonProps) {
    super(props);
  }

  render() {
    const props = this.props as ISubmitButtonProps;
    return this.compile(buttonTemplate, { ...props });
  }
}
