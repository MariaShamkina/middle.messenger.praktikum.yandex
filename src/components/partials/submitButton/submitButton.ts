import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './submitButton.hbs';
import Spinner from '../spinner';
import { withStore } from '../../../utils/withStore';

export interface ISubmitButtonProps extends IProperties, ISpinner{
    name: string;
    title: string;
    hiddenInput?: boolean;
    submitButtonIconSrc?: URL;
}

export class SubmitButton extends Component<ISubmitButtonProps> {
  protected initChildren() {
    this.children.spinner = new Spinner();
  }

  render() {
    return this.compile(buttonTemplate, this.props);
  }
}

function mapStateToProps(state: ModelData): Partial<ISubmitButtonProps> {
  return {
    isLoading: state.isLoading?.submitButton,
  };
}

export const SubmitButtonWithStore = withStore<ISubmitButtonProps>(mapStateToProps, SubmitButton);
