import Component from '../../../../../utils/component';
import changeAvatarModalWindowTemplate from './changeAvatarModalWindow.hbs';
import SubmitButton from '../../../../partials/submitButton';
import InputField from '../../../../partials/inputField';
import { store } from '../../../../../utils/store';
import { ProfileController } from '../../../../../data/profileController';

const ADD_FILE_ICON_URL = new URL('../../../../../img/add_file.svg', import.meta.url);
const CLOSE_BUTTON_URL = new URL('../../../../../img/close_button.svg', import.meta.url);

export class ChangeAvatarModalWindow extends Component {
  private reader: FileReader;

  protected initChildren() {
    this.children.submitButton = new SubmitButton({
      name: 'changeAvatar',
      title: 'Изменить аватар',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          const fileForm = this.getContent().querySelector('form') as HTMLFormElement;
          const formData = new FormData(fileForm);
          new ProfileController().changeAvatar(formData);
          this.inactivate();
        },
      },
    });

    this.children.inputField = new InputField({
      withoutBorder: false,
      fieldName: 'avatar',
      fieldPlaceholder: '',
      fieldType: 'file',
      fileAcceptTypes: 'image/*',
      events: {
        change: (e: Event) => {
          const { files } = e.target as HTMLInputElement;
          if (files && files.length > 0) {
            this.reader.readAsDataURL(files[0]);
          }
        },
      },
    });
    this.children.inputField.hide();
  }

  activate() {
    const avatarImgPreview = this.getContent()
      .querySelector('#avatarImgPreview') as HTMLImageElement;
    avatarImgPreview.src = store.getState().userData?.avatar ?? ADD_FILE_ICON_URL.toString();
    // todo когда src некорректный, то стрелка улетает под изображение. Надо поправить
    (this.getContent() as HTMLElement).classList.add('modal-active');
  }

  inactivate() {
    try {
      this.reader.abort();
    } catch {}
    (this.getContent() as HTMLElement).classList.remove('modal-active');
  }

  componentRenderFinished() {
    const avatarImgPreview = this.getContent().querySelector('#avatarImgPreview') as HTMLImageElement;
    if (avatarImgPreview) {
      this.reader = new FileReader();
      this.reader.addEventListener('load', function () {
        avatarImgPreview.src = this.result as string;
      });
    }
  }

  render() {
    const { props } = this;
    return this.compile(changeAvatarModalWindowTemplate, {
      ...props,
      closeButtonImgSrc: CLOSE_BUTTON_URL,
      addFileImgSrc: store.getState().userData?.avatar ?? ADD_FILE_ICON_URL,
    });
  }
}
