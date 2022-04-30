import { AuthApi } from '../utils/api/auth-api';
import renderDOM from '../utils/renderDOM';
import ChatPage from '../components/pages/chat';
import LoginPage from '../components/pages/login';
import { store } from '../utils/store';
import { getFormValueByName } from '../utils/helpers';
import { STATUS } from '../utils/HTTPTransport';

const authApi = new AuthApi();

function mapFormDataToApiModel(formData: FormData): LogInData {
  return {
    login: getFormValueByName(formData, 'login') as string,
    password: getFormValueByName(formData, 'password') as string,
  };
}

export class LoginController {
  public async login(formData: FormData): Promise<string> {
    try {
      const apiModel = mapFormDataToApiModel(formData);
      store.set('isLoading.submitButton', true);

      // await this.logout();// todo разлогиниться при входе на страницу логина

      const loginResponse = await authApi.logIn(apiModel)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      if (loginResponse.status === STATUS.ERROR || loginResponse.status === STATUS.UNAUTH) {
        store.set('isLoading.submitButton', false);
        return loginResponse.errorText ?? '';
      }

      const getUserResponse = await authApi.getUserData()
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);
      if (getUserResponse.status === STATUS.UNAUTH) {
        return 'Пользователь не авторизован. Повторите попытку или обратитесь в службу поддержки';
      }
      if (getUserResponse.status === STATUS.ERROR) {
        return loginResponse.errorText ?? '';
      }

      store.set('user', getUserResponse);
      // RouteManagement.go('/chats');
      renderDOM('#app', new ChatPage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }

  public async logout() {
    try {
      store.set('isLoading.submitButton', true);
      const logoutResponse = await authApi.logOut()
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);

      if (logoutResponse.status === STATUS.ERROR) {
        return logoutResponse.errorText ?? '';
      }

      store.set('user', {});
      // RouteManagement.go('/login');
      renderDOM('#app', new LoginPage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }
}
