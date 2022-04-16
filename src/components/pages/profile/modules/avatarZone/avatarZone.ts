import Component, { IProperties } from '../../../../../utils/component';
import avatarZoneTemplate from './avatarZone.hbs';

interface IAvatarZone extends IProperties{
  avatarImgSrc: URL,
  userName: string,
}

export class AvatarZone extends Component<IAvatarZone> {
  render() {
    const { props } = this;
    return this.compile(avatarZoneTemplate, {
      ...props,
    });
  }
}
