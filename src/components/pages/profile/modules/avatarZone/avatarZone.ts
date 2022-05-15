import Component, { IProperties } from '../../../../../utils/component';
import avatarZoneTemplate from './avatarZone.hbs';
import { withStore } from '../../../../../utils/withStore';

interface IAvatarZone extends IProperties{
  avatarImgSrc?: string,
  avatarUpdateIcon?: string,
  userName?: string,
}

class AvatarZone extends Component<IAvatarZone> {
  render() {
    const { props } = this;
    return this.compile(avatarZoneTemplate, {
      ...props,
    });
  }
}

function mapStateToProps(state: ModelData): IAvatarZone {
  return {
    avatarUpdateIcon: new URL('../../../../../img/update_arrow.svg', import.meta.url).toString(),
    avatarImgSrc: state.userData?.avatar ?? new URL('../../../../../img/dummy_avatar.svg', import.meta.url).toString(),
    userName: state.userData?.display_name ?? '',
  };
}

export const AvatarZoneWithStore = withStore<IAvatarZone>(mapStateToProps, AvatarZone);
