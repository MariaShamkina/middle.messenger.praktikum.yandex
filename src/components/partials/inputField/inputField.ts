import Component, { IProperties } from '../../../utils/component';
import inputFieldTemplate from './inputField.hbs';
import './_inputField.scss';

interface IInputFieldProps extends IProperties{
    fieldName: string;
    fieldPlaceholder: string;
    fieldType: string;
    value?: string;
    isValidate?: boolean;
}

export class InputField extends Component {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  render() {
    const props = this.props as IInputFieldProps;
    return this.compile(inputFieldTemplate, { ...props });
  }
}
