import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './submitButton.hbs';
import Spinner from '../spinner';
import { withStore } from '../../../utils/withStore';
import ErrorBlock from '../errorBlock';

export interface ISubmitButtonProps extends IProperties, ISpinner{
    name: string;
    title: string;
    hiddenInput?: boolean;
    submitButtonIconSrc?: URL;
}
class SubmitButton extends Component<ISubmitButtonProps> {
  protected initChildren() {
    this.children.spinner = new Spinner();
    this.children.serverErrorBlock = new ErrorBlock({
      errorsText: this.props.errorsText as string[] ?? [],
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        },
      },
    });
  }

  protected componentDidUpdate(oldProp: unknown, newProp: unknown, propName: string): boolean {
    if (propName === 'isLoading') {
      const spinner = this.children.spinner as Spinner;
      if (newProp) spinner.show();
      else spinner.hide();
      return false;
    }

    return (oldProp !== newProp);
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
