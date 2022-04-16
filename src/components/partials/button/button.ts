import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './button.hbs';

interface IButtonProps extends IProperties{
    buttonType: string;
    className: string;
    buttonText: string;
    contactMenuImgSrc?: URL;
}

export class Button extends Component<IButtonProps> {
  render() {
    return this.compile(buttonTemplate, this.props);
  }
}
