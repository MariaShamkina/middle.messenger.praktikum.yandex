import { HTTPTransport as HTTP } from '../HTTPTransport';

const loginAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/auth`);

export class AuthApi {
  logIn(data: LogInData) {
    return loginAPIInstance.post('/signin', { data });
  }

  signUp(data: SignUpData) {
    return loginAPIInstance.post<IdData>('/signup', { data });
  }

  getUserData() {
    return loginAPIInstance.get<UserData>('/user');
  }

  logOut() {
    return loginAPIInstance.post('/logout');
  }
}
