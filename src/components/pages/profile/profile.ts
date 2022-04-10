import Component from '../../../utils/component';
import profileTemplate from './profile.hbs';
import AvatarZone from './modules/avatarZone';
import { profileData } from '../../../data/profileData';
import LinkAway from '../../partials/linkAway';
import DataChangeZone from './modules/dataChangeZone';
import renderDOM from '../../../utils/renderDOM';
import ChatPage from '../chat';
import LoginPage from '../login';
import InputField from '../../partials/inputField';
import SubmitButton from '../../partials/submitButton';
import PasswordChangeZone from './modules/passwordChangeZone';

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
    this.children.dataChangeZone = new DataChangeZone({
      events: {
        click: [(e: Event) => {
          if ((e.target as HTMLElement).classList.contains('change-profile-button')) {
            const dataZoneChildren = (this.children.dataChangeZone as Component).children;
            Object.values((dataZoneChildren.profileDataZone as Component).children)
              .forEach((comp) => {
                if (comp instanceof InputField) {
                  comp.props.isReadOnly = false;
                  comp.props.isLabelShown = true;
                }
                if (comp instanceof SubmitButton) comp.props.hidden = false;
              });
            (dataZoneChildren.controlZone as Component).hide();
          }
          if ((e.target as HTMLElement).classList.contains('change-password-button')) {
            (this.children.passwordChangeZone as Component).show();
            (this.children.dataChangeZone as Component).hide();
          }
          if ((e.target as HTMLElement).classList.contains('go-away-link')) {
            renderDOM('#app', new LoginPage());
          }
        }],
      },
    });
    this.children.passwordChangeZone = new PasswordChangeZone();
  }

  render() {
    const { props } = this;
    return this.compile(profileTemplate, { ...props });
  }
}
