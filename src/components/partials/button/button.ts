import Component, { IProperties } from '../../../utils/component';
import buttonTemplate from './button.hbs';

interface IButtonProps extends IProperties{
    buttonType: string;
    className: string;
    buttonText: string;
    contactMenuImgSrc?: URL;
}

export default class Button extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    const props = this.props as IButtonProps;
    return this.compile(buttonTemplate, { ...props });
  }
}
