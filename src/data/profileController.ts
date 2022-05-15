import renderDOM from '../utils/renderDOM';
import { store } from '../utils/store';
import { getFormValueByName } from '../utils/helpers';
import { ResponseResult, STATUS } from '../utils/HTTPTransport';
import LoginPage from '../components/pages/login';
import ProfilePage from '../components/pages/profile';
import { RESOURCES_SERVER_PATH } from '../utils/api/constants';
import { ProfileAPI } from '../utils/api/profile-api';

const profileAPI = new ProfileAPI();

function mapFormDataToChangePasswordModel(formData: FormData): ChangePasswordData {
  return {
    oldPassword: getFormValueByName(formData, 'oldPassword') as string,
    newPassword: getFormValueByName(formData, 'newPassword') as string,
  };
}

function mapFormDataToProfileDataModel(formData: FormData): ProfileData {
  return {
    first_name: getFormValueByName(formData, 'first_name') as string,
    second_name: getFormValueByName(formData, 'second_name') as string,
    display_name: getFormValueByName(formData, 'display_name') as string,
    login: getFormValueByName(formData, 'login') as string,
    email: getFormValueByName(formData, 'email') as string,
    phone: getFormValueByName(formData, 'phone') as string,
  };
}

export class ProfileController {
  public getUser(id: Number | undefined) {
    if (!id) throw new Error('Пользователь не идетифицирован.');
    profileAPI.getUserProfileById(id).then((data) => store.set('user', data));
  }

  public async changePassword(formData: FormData): Promise<string> {
    try {
      const apiModel = mapFormDataToChangePasswordModel(formData);
      store.set('isLoading.submitButton', true);

      const changePasswordResponse = await profileAPI.changePassword(apiModel)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);
      if (changePasswordResponse.status === STATUS.UNAUTH) {
        renderDOM('#app', new LoginPage());// todo рендеринг на разные страницы должен быть
        // todo удалить данные о пользователе из Store
      }
      if (changePasswordResponse.status === STATUS.ERROR) {
        return changePasswordResponse.errorText ?? '';
      }

      // RouteManagement.go('/chats');
      renderDOM('#app', new ProfilePage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }

  public async changeProfileData(formData: FormData): Promise<string> {
    try {
      const apiModel = mapFormDataToProfileDataModel(formData);
      store.set('isLoading.submitButton', true);

      const changeProfileResponse: ResponseResult<UserData> = await profileAPI
        .changeProfileData(apiModel)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);

      if (changeProfileResponse.status === STATUS.UNAUTH) {
        renderDOM('#app', new LoginPage());// todo рендеринг на разные страницы должен быть
        // todo удалить данные о пользователе из Store
      }
      if (changeProfileResponse.status === STATUS.ERROR) {
        return changeProfileResponse.errorText ?? '';
      }

      if (changeProfileResponse.data?.avatar) {
        changeProfileResponse.data.avatar = `${RESOURCES_SERVER_PATH}${changeProfileResponse.data.avatar}`;
      }
      store.set('userData', changeProfileResponse.data);

      // RouteManagement.go('/chats');
      renderDOM('#app', new ProfilePage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }

  public async changeAvatar(formData: FormData): Promise<string> {
    try {
      store.set('isLoading.submitButton', true);

      const changeAvatarResponse: ResponseResult<UserData> = await profileAPI
        .changeAvatar(formData)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);

      if (changeAvatarResponse.status === STATUS.UNAUTH) {
        renderDOM('#app', new LoginPage());// todo рендеринг на разные страницы должен быть
        // todo удалить данные о пользователе из Store
      }
      if (changeAvatarResponse.status === STATUS.ERROR) {
        return changeAvatarResponse.errorText ?? '';
      }

      store.set('userData.avatar', `${RESOURCES_SERVER_PATH}${changeAvatarResponse.data?.avatar}`);

      // RouteManagement.go('/chats');
      renderDOM('#app', new ProfilePage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }
}
