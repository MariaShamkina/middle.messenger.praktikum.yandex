import Component from '../../../utils/component';
import profileTemplate from './profile.hbs';

export default class ProfilePage extends Component {
  constructor() {
    super();
    document.title = 'Профиль';
  }

  render() {
    const { props } = this;
    return this.compile(profileTemplate, { ...props });
  }
}
