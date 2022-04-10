import Component from '../../../utils/component';
import profileTemplate from './profile.hbs';
import AvatarZone from './modules/avatarZone';
import { profileData } from '../../../data/profileData';
import LinkAway from '../../partials/linkAway';
import PasswordChangeZone from './modules/passwordChangeZone';
import ProfileDataZone from './modules/profileDataZone';
import renderDOM from '../../../utils/renderDOM';
import ChatPage from '../chat';
import ControlZone from './modules/controlZone';

export default class ProfilePage extends Component {
  constructor() {
    super();
    document.title = 'Профиль';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.linkGoBack = new LinkAway({
      className: 'linkGoBack',
      linkHref: '#',
      linkText: 'Вернуться к чату',
      name: 'linkGoBack',
      title: 'Вернуться к чату',
      backArrowImgSrc: new URL('../../../img/back_arrow.svg', import.meta.url),
      events: {
        click: [() => {
          renderDOM('#app', new ChatPage());
        }],
      },
    });
    this.children.avatarZone = new AvatarZone({
      avatarImgSrc: new URL(profileData.imgSrc, import.meta.url),
      userName: profileData.display_name,
    });
    this.children.profileDataZone = new ProfileDataZone();
    this.children.passwordChangeZone = new PasswordChangeZone({
      hidden: true,
    });
    this.children.controlZone = new ControlZone();
  }

  render() {
    const { props } = this;
    return this.compile(profileTemplate, { ...props });
  }
}
