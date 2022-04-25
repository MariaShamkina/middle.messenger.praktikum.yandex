import Component, { IProperties } from '../../../../../utils/component';
import avatarZoneTemplate from './avatarZone.hbs';
import { withStore } from '../../../../../utils/withStore';

interface IAvatarZone extends IProperties{
  avatarImgSrc: string,
  userName: string,
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
    avatarImgSrc: state.userData?.avatar ?? '',
    userName: state.userData?.display_name ?? '',
  };
}

export const AvatarZoneWithStore = withStore<IAvatarZone>(mapStateToProps, AvatarZone);
