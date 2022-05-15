import { HTTPTransport as HTTP } from '../HTTPTransport';

const profileAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/user`);

export class ProfileAPI {
  getUserProfileById(id: Number) {
    return profileAPIInstance.get<UserData>(`/${id}`);
  }

  changePassword(data: ChangePasswordData) {
    return profileAPIInstance.put('/password', { data });
  }

  changeProfileData(data: ProfileData) {
    return profileAPIInstance.put<UserData>('/profile', { data });
  }

  changeAvatar(data: FormData) {
    return profileAPIInstance.put<UserData>('/profile/avatar', { data });
  }

  findContacts(data: SearchData) {
    return profileAPIInstance.post<UserData>('/search', { data });
  }
}
