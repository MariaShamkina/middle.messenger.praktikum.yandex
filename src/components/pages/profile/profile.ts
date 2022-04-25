import Component from '../../../utils/component';
import profileTemplate from './profile.hbs';
import AvatarZone from './modules/avatarZone';
import LinkAway from '../../partials/linkAway';
import renderDOM from '../../../utils/renderDOM';
// todo убрать, когда настрою Routing
/* eslint-disable import/no-cycle */
import DataChangeZone from './modules/dataChangeZone';
import ChatPage from '../chat';
import LoginPage from '../login';
import PasswordChangeZone from './modules/passwordChangeZone';
/* eslint-enable import/no-cycle */
import ChangeAvatarModalWindow from './modules/changeAvatarModalWindow';
import DataForm from '../../partials/dataForm';
import { store } from '../../../utils/store';
import { UserController } from '../../../data/userController';

export class ProfilePage extends Component {
  constructor() {
    super();
    document.title = 'Профиль';
    const id = store.getState().userData?.id;
    new UserController().getUser(id);
  }

  protected initChildren() {
    this.children.changeAvatarModalWindow = new ChangeAvatarModalWindow({
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement).closest('.modal-closeButton')
              || !(e.target as HTMLElement).closest('.changeAvatar-wrapper')) {
            (this.children.changeAvatarModalWindow as ChangeAvatarModalWindow).inactivate();
          }
        },
      },
    });
    this.children.linkGoBack = new LinkAway({
      className: 'linkGoBack',
      linkHref: '#',
      linkText: 'Вернуться к чату',
      name: 'linkGoBack',
      title: 'Вернуться к чату',
      backArrowImgSrc: new URL('../../../img/back_arrow.svg', import.meta.url),
      events: {
        click: () => {
          renderDOM('#app', new ChatPage());
        },
      },
    });
    this.children.avatarZone = new AvatarZone({
      events: {
        click: (e: Event) => {
          if (!(e.target as HTMLElement).closest('.changeAvatarButton')) return;
          (this.children.changeAvatarModalWindow as ChangeAvatarModalWindow).activate();
        },
      },
    });
    this.children.dataChangeZone = new DataChangeZone({
      events: {
        click: (e: Event) => {
          if ((e.target as HTMLElement).classList.contains('change-profile-button')) {
            const dataZoneChildren = (this.children.dataChangeZone as DataChangeZone).children;
            const profileDataChildren = (dataZoneChildren.profileDataform as DataForm).children;
            (profileDataChildren.inputFields as Component[])
              .forEach((comp) => {
                comp.props.isReadOnly = false;
                comp.props.isLabelShown = false;
              });
            (profileDataChildren.submitButton as Component).props.hiddenInput = false;
            (dataZoneChildren.controlZone as Component).hide();
          }
          if ((e.target as HTMLElement).classList.contains('change-password-button')) {
            (this.children.passwordChangeZone as Component).show();
            (this.children.dataChangeZone as Component).hide();
          }
          if ((e.target as HTMLElement).classList.contains('go-away-link')) {
            renderDOM('#app', new LoginPage());
          }
        },
      },
    });
    this.children.passwordChangeZone = new PasswordChangeZone();
  }

  render() {
    return this.compile(profileTemplate, this.props);
  }
}
