import Component, { IProperties } from '../../../../../utils/component';
import avatarZoneTemplate from './avatarZone.hbs';

interface IAvatarZone extends IProperties{
  avatarImgSrc: URL,
  userName: string,
}

export default class AvatarZone extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IAvatarZone) {
    super(props);
  }

  render() {
    const { props } = this;
    return this.compile(avatarZoneTemplate, {
      ...props,
    });
  }
}
