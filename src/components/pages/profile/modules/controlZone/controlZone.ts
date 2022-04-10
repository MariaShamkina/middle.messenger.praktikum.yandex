import Component from '../../../../../utils/component';
import controlZoneTemplate from './controlZone.hbs';
import './controlZone.scss';
import Button from '../../../../partials/button';
import LinkAway from '../../../../partials/linkAway';

export default class ControlZone extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.buttonChangeProfile = new Button({
      buttonText: 'Изменить профиль',
      buttonType: 'button',
      className: 'change-profile-button control-container-button',
    });
    this.children.buttonChangePassword = new Button({
      buttonText: 'Изменить пароль',
      buttonType: 'button',
      className: 'change-password-button control-container-button',
    });
    this.children.linkAwayExitAccount = new LinkAway({
      className: 'go-away-link',
      linkHref: '#',
      linkText: 'Выйти',
      name: 'go-away-link',
      title: 'Выйти из аккаунта',
    });
  }

  render() {
    const { props } = this;
    return this.compile(controlZoneTemplate, {
      ...props,
    });
  }
}