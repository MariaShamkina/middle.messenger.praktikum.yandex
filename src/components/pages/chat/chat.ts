import Component from '../../../utils/component';
import renderDOM from '../../../utils/renderDOM';
import chatTemplate from './chat.hbs';
import LinkAway from '../../partials/linkAway';
import SearchField from '../../partials/searchField';
import ProfilePage from '../profile';
import ContactsModule from './modules/contacts';
import ContentModule from './modules/content';
import { CONTACTS_DATA } from '../../../data/contactsData';
import { AuthController } from '../../../data/authController';
import { UserNotAuthError } from '../../../utils/helpers';
import LoginPage from '../login';

export class ChatPage extends Component {
  constructor() {
    super();
    document.title = 'Чат';
  }

  initChildren() {
    this.children.linkAway = new LinkAway({
      title: 'Перейти к профилю',
      linkHref: '#',
      linkText: 'Профиль',
      name: 'profile-link',
      className: 'my-profile-link',
      events: {
        click: () => {
          new AuthController().getUserData()
            .then(() => renderDOM('#app', new ProfilePage()))
            .catch((error: UserNotAuthError) => {
              renderDOM('#app', new LoginPage());// todo обработать исключение в классе роутинга
            });
        },
      },
    });
    this.children.searchInput = new SearchField();
    this.children.contacts = new ContactsModule({
      contacts: CONTACTS_DATA,
      events: {
        click: (e: Event) => {
          const tab = (e.target as HTMLElement).closest('.tab');
          const contactsListWrapper = e.currentTarget as HTMLElement;
          if (!tab || !contactsListWrapper.contains(tab)) {
            return;
          }
          const prevActTab = contactsListWrapper.querySelector('.tab.active');
          const contentProps = (this.children.content as Component).props;
          if (prevActTab === tab) {
            contentProps.contactId = null;
          } else {
            tab.classList.add('active');
            if (prevActTab) { prevActTab.classList.remove('active'); }

            const idField: HTMLElement | null = tab.querySelector('#id');
            if (idField && idField.textContent) {
              contentProps.contactId = parseInt(idField.textContent, 10);
            }
          }
        },
        mouseenter: (e: Event) => (e.target as HTMLElement).classList.add('showScrollbar'),
        mouseleave: (e: Event) => (e.target as HTMLElement).classList.remove('showScrollbar'),
      },
    });
    this.children.content = new ContentModule({
      contactId: null,
    });
  }

  render() {
    return this.compile(chatTemplate, this.props);
  }
}
