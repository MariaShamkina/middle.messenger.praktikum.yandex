import Component, { IProperties } from '../../../utils/component';
import linkAwayTemplate from './linkAway.hbs';
import './_linkAway.scss';

interface IlinkAwayProps extends IProperties{
    labelText: string;
    name: string;
    linkHref: string;
    linkText: string;
}

export class LinkAway extends Component {
  constructor(props: IlinkAwayProps) {
    super(props);
  }

  render() {
    const props = this.props as IlinkAwayProps;
    return this.compile(linkAwayTemplate, { ...props });
  }
}
