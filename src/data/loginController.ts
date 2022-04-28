import { AuthApi } from '../utils/api/auth-api';
import renderDOM from '../utils/renderDOM';
import ChatPage from '../components/pages/chat';
import { store } from '../utils/store';
import { getFormValueByName, isBadRequestError } from '../utils/helpers';
import LoginPage from '../components/pages/login';

const authApi = new AuthApi();

function mapFormDataToApiModel(formData: FormData): LogInData {
  return {
    login: getFormValueByName(formData, 'login') as string,
    password: getFormValueByName(formData, 'password') as string,
  };
}

export class LoginController {
  public async login(formData: FormData) {
    try {
      const apiModel = mapFormDataToApiModel(formData);
      store.set('isLoading.submitButton', true);

      const loginResponse = await authApi.logIn(apiModel);
      if (isBadRequestError(loginResponse)) {
        store.set('isLoading.submitButton', false);
        return loginResponse.reason;
      }

      const getUserResponse = await authApi.getUserData();
      store.set('isLoading.submitButton', false);
      if (isBadRequestError(getUserResponse)) return getUserResponse.reason;

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
      const logoutResponse = await authApi.logOut();
      store.set('isLoading.submitButton', false);

      if (isBadRequestError(logoutResponse)) return logoutResponse.reason;

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
