import contentTemplate from './content.hbs';
import Component, { IProperties } from '../../../../../utils/component';
import ContentInfo from '../contentInfo';
import MessageDashboard from '../messagesDashboard';
import NewMessageForm from '../newMessageForm';
import { getContactData } from '../../../../../data/contactsData';
import { getConversation } from '../../../../../data/contentData';

interface IContent extends IProperties{
  contactId: Number | null;
}

export class ContentModule extends Component<IContent> {
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
    return this.compile(contentTemplate, this.props);
  }
}
