import { HTTPTransport as HTTP } from '../HTTPTransport';

const chatAPIInstance = new HTTP(`${process.env.API_ENDPOINT}/chats`);

export class ChatAPI {
  create(data: CreateChatData) {
    return chatAPIInstance.post('', { data });
  }

  request() {
    return chatAPIInstance.get<ChatsResponse>('');
  }
}
