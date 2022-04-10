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

export default class LinkAway extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IlinkAwayProps) {
    super(props);
  }

  render() {
    const props = this.props as IlinkAwayProps;
    return this.compile(linkAwayTemplate, { ...props });
  }
}