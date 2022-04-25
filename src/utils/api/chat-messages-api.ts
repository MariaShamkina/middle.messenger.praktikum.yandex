import { HTTPTransport as HTTP } from '../HTTPTransport';

const chatMessagesAPIInstance = new HTTP(`${process.env.API_ENDPOINT}`);

class ChatMessagesAPI {
  request() {
  }
}
