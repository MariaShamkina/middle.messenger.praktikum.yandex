import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './submitButton.hbs';
import './_submitButton.scss';

interface IButtonProps extends IProperties{
    name: string;
    title: string;
    hidden?: boolean;
}

export class SubmitButton extends Component {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    const props = this.props as IButtonProps;
    return this.compile(buttonTemplate, { ...props });
  }
}
