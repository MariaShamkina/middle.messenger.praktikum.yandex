import Component, { IProperties } from '../../../../../utils/component';
import messageDashboardTemplate from './messagesDashboard.hbs';

interface IMessageDashboard extends IProperties{
    content?: Message[],
}

export class MessageDashboard extends Component<IMessageDashboard> {
  render() {
    const { props } = this;
    return this.compile(messageDashboardTemplate, {
      ...props,
    });
  }
}
