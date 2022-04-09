import Component, { IProperties } from '../../../../../utils/component';
import contactsTemplate from './contacts.hbs';

interface IContacts extends IProperties{
  contacts: contactData[];
}

export default class ContactsModule extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IContacts) {
    super(props);
  }

  render() {
    const { props } = this;
    return this.compile(contactsTemplate, { ...props });
  }
}
