import { AuthApi } from '../utils/api/auth-api';
import renderDOM from '../utils/renderDOM';
import ChatPage from '../components/pages/chat';
import { store } from '../utils/store';
import { getFormValueByName } from '../utils/helpers';
import { ResponseResult, STATUS } from '../utils/HTTPTransport';

const authApi = new AuthApi();

function mapFormDataToSignUpModel(formData: FormData): SignUpData {
  return {
    email: getFormValueByName(formData, 'email') as string,
    first_name: getFormValueByName(formData, 'first_name') as string,
    second_name: getFormValueByName(formData, 'second_name') as string,
    phone: getFormValueByName(formData, 'phone') as string,
    login: getFormValueByName(formData, 'login') as string,
    password: getFormValueByName(formData, 'password') as string,
  };
}

export class SignupController {
  public async signup(formData: FormData): Promise<string> {
    try {
      const apiModel = mapFormDataToSignUpModel(formData);
      store.set('isLoading.submitButton', true);

      const signupResponse: ResponseResult<IdData> = await authApi.signUp(apiModel)
        .catch((error: Error) => ({ status: STATUS.ERROR, errorText: error.message }));
      store.set('isLoading.submitButton', false);
      if (signupResponse.status === STATUS.ERROR || signupResponse.status === STATUS.UNAUTH) {
        return signupResponse.errorText ?? '';
      }

      const userId = signupResponse.data?.id;
      if (!userId) return 'Пользователь не идетифицирован';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...dataWithoutPassword } = apiModel;
      const userData: UserData = {
        id: userId,
        ...dataWithoutPassword,
        avatar: '',
        display_name: '',
      };
      store.set('userData', userData);

      // RouteManagement.go('/chats');
      renderDOM('#app', new ChatPage());// todo рендеринг на разные страницы должен быть
      return '';
    } catch (error) {
      store.set('isLoading.submitButton', false);
      return error.toString();
    }
  }
}
