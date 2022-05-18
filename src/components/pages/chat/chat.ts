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
import NewContacts from './modules/newContacts';
import { ProfileController } from '../../../data/profileController';
import { INewContacts } from './modules/newContacts/newContacts';

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
    this.children.searchInput = new SearchField({
      events: {
        keypress: (e: KeyboardEvent) => {
          if (e.key !== 'Enter') return;

          e.preventDefault();
          new ProfileController().searchContactsByLogin((e.target as HTMLInputElement).value)
            .then((response) => {
              if (!Array.isArray(response)) {
                let errorMessage;
                if (typeof response !== 'string') errorMessage = 'Неверный формат данных';
              // todo вывести ошибки
              // (serverErrorBlock.props as IErrorBlockProps).errorsText = [errorMessage];
              // serverErrorBlock.show();
              } else {
                ((this.children.newContacts as Component).props as INewContacts)
                  .newContacts = response;
              }
            });
        },
        search: (e: Event) => {
          (this.children.newContacts as Component).hide();
        },
      },
    });
    this.children.newContacts = new NewContacts({
      events: {
        mouseenter: (e: Event) => (e.target as HTMLElement).classList.add('showScrollbar'),
        mouseleave: (e: Event) => (e.target as HTMLElement).classList.remove('showScrollbar'),
      },
    });
    (this.children.newContacts as Component).hide();
    this.children.contacts = new ContactsModule({
      contacts: CONTACTS_DATA,
      events: {
        mouseenter: (e: Event) => (e.target as HTMLElement).classList.add('showScrollbar'),
        mouseleave: (e: Event) => (e.target as HTMLElement).classList.remove('showScrollbar'),
      },
    });
    this.children.content = new ContentModule({
      contactId: null,
    });
  }

  protected componentRenderFinished() {
    super.componentRenderFinished();
    const chatContactsPanel = this.getContent().querySelector('.chat-contacts-panel');
    chatContactsPanel?.addEventListener('click', (e: Event) => {
      const tab = (e.target as HTMLElement).closest('.tab');
      if (!tab || !chatContactsPanel.contains(tab)) {
        return;
      }

      const prevActTab = chatContactsPanel.querySelector('.tab.active');
      tab.classList.add('active');
      if (prevActTab) { prevActTab.classList.remove('active'); }

      const contentProps = (this.children.content as Component).props;
      if (prevActTab === tab) {
        contentProps.contactId = null;
      } else {
        const idField: HTMLElement | null = tab.querySelector('#id');
        if (idField && idField.textContent) {
          contentProps.contactId = parseInt(idField.textContent, 10);
        }
      }
    });
  }

  render() {
    return this.compile(chatTemplate, this.props);
  }
}
