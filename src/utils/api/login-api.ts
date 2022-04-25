import { HTTPTransport as HTTP } from '../HTTPTransport';

const loginAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/auth`);

export class LoginAPI {
  signIn(data: SignInData) {
    return loginAPIInstance.post('/signin', { data });
  }
}
