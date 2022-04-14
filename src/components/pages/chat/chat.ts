import Component from '../../../utils/component';
import renderDOM from '../../../utils/renderDOM';
import chatTemplate from './chat.hbs';
import LinkAway from '../../partials/linkAway';
import SearchField from '../../partials/searchField';
import ProfilePage from '../profile';
import ContactsModule from './modules/contacts';
import ContentModule from './modules/content';
import { contactsData } from '../../../data/contactsData';

export default class ChatPage extends Component {
  constructor() {
    super();
    document.title = 'Чат';
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  initChildren() {
    this.children.linkAway = new LinkAway({
      title: 'Перейти к профилю',
      linkHref: '#',
      linkText: 'Профиль',
      name: 'profile-link',
      className: 'my-profile-link',
      events: {
        click: [() => {
          renderDOM('#app', new ProfilePage());
        }],
      },
    });
    this.children.searchInput = new SearchField();
    this.children.contacts = new ContactsModule({
      contacts: contactsData,
      events: {
        click: [function (e: Event) {
          const tab = (e.target as HTMLElement).closest('.tab');
          if (!tab || !(e.currentTarget as HTMLElement).contains(tab)) return;
          const prevActTab = (e.currentTarget as HTMLElement).querySelector('.tab.active');
          tab.classList.add('active');
          if (prevActTab) { prevActTab.classList.remove('active'); }

          const idField: HTMLElement | null = tab.querySelector('#id');
          if (idField && idField.textContent) {
            this.children.content.props.contactId = parseInt(idField.textContent, 10);
          }
        }.bind(this)],
        mouseenter: [(e: Event) => (e.target as HTMLElement).classList.add('showScrollbar')],
        mouseleave: [(e: Event) => (e.target as HTMLElement).classList.remove('showScrollbar')],
      },
    });
    this.children.content = new ContentModule({
      contactId: null,
    });
  }

  render() {
    const { props } = this;
    return this.compile(chatTemplate, { ...props });
  }
}
