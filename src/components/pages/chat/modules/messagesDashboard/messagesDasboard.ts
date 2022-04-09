import Component, { IProperties } from '../../../../../utils/component';
import messageDashboardTemplate from './messagesDashboard.hbs';
import './messagesDashboard.scss';

interface IMessageDashboard extends IProperties{
    content?: message[],
}

export default class MessageDashboard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IMessageDashboard) {
    super(props);
  }

  render() {
    const { props } = this;
    return this.compile(messageDashboardTemplate, {
      ...props,
    });
  }
}
