import Component, { IProperties } from '../../../../../utils/component';
import contactsTemplate from './contacts.hbs';

interface IContacts extends IProperties{
  contacts?: ContactData[];
}

export class ContactsModule extends Component<IContacts> {
  render() {
    return this.compile(contactsTemplate, this.props);
  }
}
