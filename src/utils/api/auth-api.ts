import { HTTPTransport as HTTP } from '../HTTPTransport';

const loginAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/auth`);

export class AuthApi {
  logIn(data: LogInData) {
    return loginAPIInstance.post('/signin', { data });// todo useCredentials = false ??
  }

  signUp(data: SignUpData) {
    return loginAPIInstance.post<IdData>('/signup', { data });// todo useCredentials = false ??
  }

  getUserData() {
    return loginAPIInstance.get<UserData>('/user');
  }

  logOut() {
    return loginAPIInstance.post('/logout');
  }
}
