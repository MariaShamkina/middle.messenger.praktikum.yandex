import Component from '../../../../../utils/component';
import changeAvatarModalWindowTemplate from './changeAvatarModalWindow.hbs';
import SubmitButton from '../../../../partials/submitButton';

export default class ChangeAvatarModalWindow extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.submitButton = new SubmitButton({
      name: 'changeAvatar',
      title: 'Изменить аватар',
      events: {
        click: [(e: Event) => {
          e.preventDefault();
          this.inactivate();
        }],
      },
    });
  }

  activate() {
    (this.getContent() as HTMLElement).classList.add('modal-active');
  }

  inactivate() {
    (this.getContent() as HTMLElement).classList.remove('modal-active');
  }

  render() {
    const { props } = this;
    return this.compile(changeAvatarModalWindowTemplate, {
      ...props,
      closeButtonImgSrc: new URL('../../../../../img/close_button.svg', import.meta.url),
      addFileImgSrc: new URL('../../../../../img/add_file.svg', import.meta.url),
    });
  }
}
