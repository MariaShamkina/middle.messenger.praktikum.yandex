import { AuthApi } from '../utils/api/auth-api';
import renderDOM from '../utils/renderDOM';
import ChatPage from '../components/pages/chat';
import LoginPage from '../components/pages/login';
import { store } from '../utils/store';
import { getFormValueByName, UserNotAuthError } from '../utils/helpers';
import { ResponseResult, STATUS } from '../utils/HTTPTransport';
import { RESOURCES_SERVER_PATH } from '../utils/api/constants';

const authApi = new AuthApi();

function mapFormDataToLogInModel(formData: FormData): LogInData {
  return {
    login: getFormValueByName(formData, 'login') as string,
    password: getFormValueByName(formData, 'password') as string,
  };
}

export class AuthController {
  public async login(formData: FormData): Promise<string> {
    try {
      const apiModel = mapFormDataToLogInModel(formData);
      store.set('isLoading.submitButton', true);

      const loginResponse = await authApi.logIn(apiModel)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      if (loginResponse.status === STATUS.ERROR || loginResponse.status === STATUS.UNAUTH) {
        store.set('isLoading.submitButton', false);
        return loginResponse.errorText ?? '';
      }

      const getUserResponse: ResponseResult<UserData> = await authApi.getUserData()
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);
      if (getUserResponse.status === STATUS.UNAUTH) {
        return 'Пользователь не авторизован. Повторите попытку или обратитесь в службу поддержки';
      }
      if (getUserResponse.status === STATUS.ERROR) {
        return loginResponse.errorText ?? '';
      }

      if (getUserResponse.data?.avatar) {
        getUserResponse.data.avatar = `${RESOURCES_SERVER_PATH}${getUserResponse.data.avatar}`;
      }
      store.set('userData', getUserResponse.data);
      // RouteManagement.go('/chats');
      renderDOM('#app', new ChatPage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }

  public async logout() {
    try { // todo выходить надо бы в любом случае и рендерить логин. А что делать с ошибкой?
      store.set('isLoading.submitButton', true);
      const logoutResponse = await authApi.logOut()
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);

      if (logoutResponse.status === STATUS.ERROR) {
        return logoutResponse.errorText ?? '';
      }

      store.set('userData', undefined);
      // RouteManagement.go('/login');
      renderDOM('#app', new LoginPage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }

  public async getUserData() {
    if (store.getState().userData) {
      return '';
    }

    try {
      store.set('isLoading.getUserData', true);
      const getUserResponse: ResponseResult<UserData> = await authApi.getUserData()
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.getUserData', false);

      if (getUserResponse.status === STATUS.ERROR || getUserResponse.status === STATUS.UNAUTH) {
        throw new UserNotAuthError();
      }
      if (getUserResponse.data?.avatar) {
        getUserResponse.data.avatar = `${RESOURCES_SERVER_PATH}${getUserResponse.data.avatar}`;
      }
      store.set('userData', getUserResponse.data);
      return '';
    } catch (error) {
      store.set('isLoading.getUserData', false);
      throw new UserNotAuthError();
    }
  }
}
