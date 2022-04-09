import Component from '../../../../../utils/component';
import messageDashboardTemplate from './newMessageForm.hbs';
import './newMessageForm.scss';

export default class NewMessageForm extends Component {
  render() {
    const { props } = this;
    return this.compile(messageDashboardTemplate, {
      ...props,
      fileIconSrc: new URL('../../../../../img/add_file.svg', import.meta.url),
      sendMessIconSrc: new URL('../../../../../img/send-comment.svg', import.meta.url),
    });
  }
}
