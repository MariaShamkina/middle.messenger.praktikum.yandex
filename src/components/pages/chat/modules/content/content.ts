import contentTemplate from './content.hbs';
import Component, { IProperties } from '../../../../../utils/component';
import ContentInfo from '../contentInfo';
import MessageDashboard from '../messagesDashboard';
import NewMessageForm from '../newMessageForm';
import getContactData from '../../../../../data/contactsData';
import getConversation from '../../../../../data/contentData';

interface IContent extends IProperties{
  contactId: Number | null;
}

export default class ContentModule extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IContent) {
    super(props);
  }

  protected componentDidUpdate(oldProp: unknown, newProp: unknown, propName: string) {
    if (propName === 'contactId' && typeof newProp === 'number') {
      if (newProp === oldProp) return false;

      this.children.contentInfo = new ContentInfo({
        contactInfo: getContactData(newProp),
      });
      this.children.messagesDashboard = new MessageDashboard({
        content: getConversation(newProp),
      });
      this.children.newMessageForm = new NewMessageForm();
    }
    return true;
  }

  render() {
    const { props } = this;
    return this.compile(contentTemplate, { ...props });
  }
}
