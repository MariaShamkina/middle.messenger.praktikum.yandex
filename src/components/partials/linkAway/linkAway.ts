import Component, { IProperties } from '../../../utils/component';
import linkAwayTemplate from './linkAway.hbs';

interface IlinkAwayProps extends IProperties{
    name: string;
    linkHref: string;
    linkText: string;
    className: string;
    title: string;
    backArrowImgSrc?: URL;
}

export class LinkAway extends Component<IlinkAwayProps> {
  render() {
    return this.compile(linkAwayTemplate, this.props);
  }
}
