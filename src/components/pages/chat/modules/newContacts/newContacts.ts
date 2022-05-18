import Component, { IProperties } from '../../../../../utils/component';
import newContactsTemplate from './newContacts.hbs';

export interface INewContacts extends IProperties{
  newContacts?: UserData[];
}

export class NewContactsModule extends Component<INewContacts> {
  protected componentRenderFinished() {
    super.componentRenderFinished();
    const props = this.props as INewContacts;
    if (!props.newContacts || props.newContacts.length === 0) {
      this.hide();
    }
  }

  render() {
    return this.compile(newContactsTemplate, this.props);
  }
}
