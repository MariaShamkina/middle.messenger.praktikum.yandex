import { ProfileAPI } from '../utils/api/profile-api';
import { store } from '../utils/store';

export class UserController {
  profileAPI = new ProfileAPI();

  public getUser(id: Number | undefined) {
    if (!id) throw new Error('Пользователь не идетифицирован.');
    this.profileAPI.getUserProfileById(id).then((data) => store.set('user', data));
  }
}
