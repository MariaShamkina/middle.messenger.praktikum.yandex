import { HTTPTransport as HTTP } from '../HTTPTransport';

const profileAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/user`);

export class ProfileAPI {
  public getUserProfileById(id: Number) {
    return profileAPIInstance.get<UserData>(`/user/${id}`);
  }
}
